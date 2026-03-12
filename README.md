# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

At a high level:

- `src/main.tsx` mounts the React app into `index.html` and loads global styles from `src/index.css`.
- `src/App.tsx` wires up providers (React Query, tooltips, toasts) and defines the main routes.
- `src/components/AppLayout.tsx` and `src/components/AppSidebar.tsx` define the shared layout shell (sidebar + content).
- `src/pages/*` contains each route’s page component (Dashboard, Cars, Leads, Automations, AI Assistant, Settings, NotFound).
- `src/components/ui/*` contains reusable UI primitives (buttons, cards, dialogs, sidebar, etc.).

## How can I deploy this project?

This project is deployed as a static Vite + React single-page app.

- **Build**: `npm run build` (outputs to the `dist` directory).
- **Preview locally**: `npm run preview`.

### Deploying to Vercel

This repo includes a `vercel.json` configured for SPA-style routing:

```json
{
  "version": 2,
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

- Vercel serves real static files from `dist` (e.g. `/assets/*`, `/Otto_Logo.png`) first.
- Any other path (like `/dashboard`, `/cars`, `/leads`) is rewritten to `/index.html`, where React Router’s `BrowserRouter` takes over.

To deploy:

1. Create a new Vercel project and connect this repository.
2. Set **Build Command** to `npm run build`.
3. Set **Output Directory** to `dist`.
4. Use the “Vite” or “Other” framework preset (not Next.js).

After deployment, direct navigation to routes such as `/dashboard` or `/leads` should no longer show a Vercel 404, but instead load the SPA and render the correct page.
