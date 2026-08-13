# The Board — Oregon Football Recruiting (PWA)

A recruiting war room: drag-and-drop board (position × grade), prospect profiles with
call logs and family contacts, 247Sports/On3 profile links, and a phone-first mobile UI.
Installs to an iPhone home screen as a clickable app icon.

## Deploy (about 5 minutes, no coding)

1. **Create the repo.** Sign in at github.com → **New repository** → name it `the-board`
   (Public) → Create. Then **Add file → Upload files**, drag in everything from this
   folder (keep the folder structure), and **Commit**.
2. **Turn on the website.** Repo **Settings → Pages** → under *Build and deployment*
   set **Source: Deploy from a branch**, **Branch: `main`**, **Folder: `/docs`** → Save.
   After ~1 minute your app is live at `https://YOUR-USERNAME.github.io/the-board/`.
3. **Install on iPhone.** Open that URL in **Safari** → tap **Share** →
   **Add to Home Screen**. The Board icon lands on the home screen and opens
   full-screen like a native app. Send staff the URL + the staff password.

## Shared staff board (recommended, ~10 minutes, free)

Out of the box each device keeps its own copy (the header shows *"Saved on this
device"*). For one live board the whole staff shares:

1. Create a free project at **supabase.com**.
2. In the project's **SQL Editor**, paste and run `supabase/schema.sql`.
3. In **Settings → API**, copy the **Project URL** and **anon public** key.
4. Edit `docs/config.js`, uncomment the `supabase` block, paste both values, commit.

The header will now show *"Shared board synced"*; the **⟳ Refresh** button pulls
teammates' latest changes.

## Making changes later

The app source is `src/app.jsx`. After editing:

```
npm install
npm run build
```

then commit the regenerated `docs/app.js` and bump `CACHE_VERSION` in `docs/sw.js`
so installed phones pick up the update.

## Honest security notes (read before loading real data)

- The staff password (`Recruit26`) is checked **in the browser**. It keeps casual
  visitors out; it is **not** real authentication — someone technical with the URL
  can bypass it.
- The Supabase anon key in `config.js` is public by design. Anyone holding it can
  read/write the board — the same trust level as the shared password.
- This app will hold contact information for minors once staff fill in profiles.
  Before that happens in production, add real per-user auth (Supabase Auth drops
  into this same project) and lock the `boards` table policies to signed-in staff.
