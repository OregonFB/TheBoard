-- ============================================================
-- The Board — auth schema v2 (individual accounts, roles, audit)
-- Run ONCE in the school's DEDICATED Supabase project's SQL Editor.
-- Safe to re-run: upgrades a v1 install in place.
-- Roles: admin (sees everything) | staff (never sees admin-authored evals)
-- v2 adds: active/pw_set account flags, the login_events audit trail,
-- and active-profile gating on EVERY data policy — a deactivated or
-- unprovisioned account gets nothing from the database itself.
-- ============================================================
create extension if not exists pgcrypto;

-- Who is who. One row per account; role + active drive every rule below.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  role text not null default 'staff' check (role in ('admin','staff')),
  active boolean not null default true,
  pw_set boolean not null default false
);
-- v1 -> v2 upgrades
alter table profiles add column if not exists active boolean not null default true;
alter table profiles add column if not exists pw_set boolean not null default false;

-- The shared board (players, grades, call logs) — one JSON document per key.
create table if not exists boards (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

-- Per-staffer evaluations live OUTSIDE the board document so the server can
-- filter them by role before they ever reach a browser.
create table if not exists evaluations (
  id uuid primary key default gen_random_uuid(),
  player_id text not null,
  author_id uuid not null references profiles(id) on delete cascade,
  author_name text not null,
  text text not null,
  updated_at_label text,
  updated_at timestamptz default now(),
  unique (player_id, author_id)
);

-- Login audit trail — who signed in, when. Admin-readable in 🔑 Access.
create table if not exists login_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  username text not null,
  name text not null,
  at timestamptz default now()
);

-- Kill the legacy OPEN policies in case the old schema.sql ever ran here:
drop policy if exists "board read"   on boards;
drop policy if exists "board insert" on boards;
drop policy if exists "board update" on boards;
-- Drop v1/v2 policies so re-running this file upgrades cleanly in place:
drop policy if exists "profiles read"         on profiles;
drop policy if exists "profiles admin update" on profiles;
drop policy if exists "boards read"           on boards;
drop policy if exists "boards insert"         on boards;
drop policy if exists "boards update"         on boards;
drop policy if exists "evals read"            on evaluations;
drop policy if exists "evals insert own"      on evaluations;
drop policy if exists "evals update own"      on evaluations;
drop policy if exists "evals delete own"      on evaluations;
drop policy if exists "login events insert"   on login_events;
drop policy if exists "login events admin read" on login_events;

alter table profiles     enable row level security;
alter table boards       enable row level security;
alter table evaluations  enable row level security;
alter table login_events enable row level security;

-- Helpers (security definer so policies can consult profiles without recursion)
create or replace function public.is_admin() returns boolean
language sql security definer stable set search_path = public as
$$ select exists (select 1 from profiles where id = auth.uid() and role = 'admin' and active) $$;

create or replace function public.is_active_profile() returns boolean
language sql security definer stable set search_path = public as
$$ select exists (select 1 from profiles where id = auth.uid() and active) $$;

create or replace function public.author_role(a uuid) returns text
language sql security definer stable set search_path = public as
$$ select role from profiles where id = a $$;

-- A signed-in user marks their own account as having a personal password.
create or replace function public.mark_pw_set() returns void
language sql security definer set search_path = public as
$$ update profiles set pw_set = true where id = auth.uid() $$;

-- profiles: active staff see the roster (names/roles); a deactivated account
-- can still read ONLY its own row (so the app can say WHY it was signed out);
-- only admins may change anyone.
create policy "profiles read" on profiles for select to authenticated
  using (is_active_profile() or id = auth.uid());
create policy "profiles admin update" on profiles for update to authenticated
  using (is_admin());

-- boards: only provisioned, ACTIVE accounts read or write the shared board.
create policy "boards read"   on boards for select to authenticated using (is_active_profile());
create policy "boards insert" on boards for insert to authenticated with check (is_active_profile());
create policy "boards update" on boards for update to authenticated using (is_active_profile());

-- evaluations — THE role rule: admins read every eval; staff read their own
-- and other staff's, but never an eval authored by an admin.
create policy "evals read" on evaluations for select to authenticated using (
  is_active_profile() and (is_admin() or author_id = auth.uid() or author_role(author_id) = 'staff')
);
create policy "evals insert own" on evaluations for insert to authenticated
  with check (author_id = auth.uid() and is_active_profile());
create policy "evals update own" on evaluations for update to authenticated
  using (is_active_profile() and (author_id = auth.uid() or is_admin()));
create policy "evals delete own" on evaluations for delete to authenticated
  using (is_active_profile() and (author_id = auth.uid() or is_admin()));

-- login_events: any active account records its own logins; admins read them.
create policy "login events insert" on login_events for insert to authenticated
  with check (user_id = auth.uid() and is_active_profile());
create policy "login events admin read" on login_events for select to authenticated
  using (is_admin());

-- ============================================================
-- Table privileges. RLS (above) gates ROWS; these gate the tables
-- themselves. New Supabase projects grant API roles nothing by default.
-- anon deliberately gets NOTHING: without a session the API cannot even
-- see these tables — deny-by-default, enforced twice.
-- ============================================================
grant usage on schema public to authenticated, service_role;
grant select, insert, update on public.profiles     to authenticated, service_role;
grant select, insert, update on public.boards       to authenticated, service_role;
grant select, insert, update, delete on public.evaluations to authenticated, service_role;
grant select, insert on public.login_events         to authenticated, service_role;
grant execute on function public.is_admin()            to authenticated;
grant execute on function public.is_active_profile()   to authenticated;
grant execute on function public.author_role(uuid)     to authenticated;
grant execute on function public.mark_pw_set()         to authenticated;
