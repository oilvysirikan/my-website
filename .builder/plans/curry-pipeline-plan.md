# Dev Server Configuration and Launch Plan

## Objective
Configure and start the dev server for this Vue + Vite + Cloudflare Workers project.

## Current State
- Dev server is not configured (dev_command is empty)
- Project is a Vue.js app with Vite build tool
- Package.json has `npm run dev` script defined (which runs `vite`)
- Project builds to `dist` for Cloudflare Pages deployment

## Recommended Approach

### Step 1: Configure Project Settings
Update the dev server configuration in project settings with:
- **Dev Command**: `npm run dev`
- **Setup Command**: Leave empty (no additional setup needed, dependencies are already installed)
- **Proxy Port**: Default (9000 or auto-detect)

### Step 2: Restart Dev Server
Once configured, restart the dev server to start the Vite development server locally.

### Step 3: Verify
After restart, the preview iframe should show the running Vue app.

## Rationale
- `npm run dev` is the standard way to run this Vite project
- The `vite.config.js` is minimal and already properly configured for Vue
- No custom setup steps are needed - the project is ready to run immediately
- Cloudflare Workers functions are served separately and don't block the frontend dev server

## Files to Update
- Project settings (not a code file - done via UI at [Open Project Settings](#open-project-settings))
