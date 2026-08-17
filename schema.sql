-- The Board: shared storage table. Run this once in your Supabase project's SQL editor.
-- One key/value table backs everything:
--   board-<school>-players        shared player data (everyone reads/writes)
--   board-<school>-stack::<name>  one staffer's personal board arrangement
--   board-<school>               legacy single-doc board (auto-migrated on first load)
create table if not exists boards (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);
alter table boards enable row level security;
-- Open to anyone holding the anon key (same trust level as the shared staff password).
-- Replace with Supabase Auth policies before storing sensitive data.
create policy "board read"   on boards for select using (true);
create policy "board insert" on boards for insert with check (true);
create policy "board update" on boards for update using (true);
