<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/cefee3ea-f1aa-414b-9c78-f0394cd154c8

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Contact form backend

Run the API separately from `backend/` with `npm install` and `npm start`. The Vite development server proxies `/api` to `http://localhost:5000`. For a deployed frontend, set `VITE_API_URL` to the deployed backend URL, including its `/api` path, for example `https://api.example.com/api`.

The backend accepts `FIREBASE_SERVICE_ACCOUNT_JSON`, `GOOGLE_APPLICATION_CREDENTIALS`, `FIREBASE_SERVICE_ACCOUNT_PATH`, and `ALLOWED_ORIGINS` environment variables. Keep service-account credentials out of source control and rotate any key that has been exposed. For local development, download a new JSON key from Firebase Console > Project settings > Service accounts, then set `FIREBASE_SERVICE_ACCOUNT_PATH` to its absolute path.

## Deploying the live contact form on Netlify

The live API is implemented as Netlify Functions. In the Netlify site settings, add an environment variable named `FIREBASE_SERVICE_ACCOUNT_JSON` containing the complete contents of the new Firebase service-account JSON file, then trigger a new deploy. Do not commit the JSON file. After deployment, verify `https://www.bizzjump.com/api/health` returns JSON with `"status":"ok"`.
