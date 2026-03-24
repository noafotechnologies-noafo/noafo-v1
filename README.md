# NOAFO V1

A clean, modular React + Vite project designed to make travel decisions easier and more trustworthy for women.

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Main application page components
- `/src/services` - API calls and external services (Supabase)
- `/src/styles` - Global styles and theme configurations
- `/public` - Static assets
- `/docs` - Project documentation
- `vercel.json` - Vercel deployment SPA routing configuration

## How to run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## How to deploy on Vercel

1. Push the repository to **GitHub**.
2. Import the project in your **Vercel** dashboard.
3. Add the following environment variables (found in `.env.example`):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. (Vercel will automatically build the site using `npm run build` and respect the `vercel.json` rewrite rules).
