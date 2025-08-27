<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1AJSDhqyyMOOGMYX7KKPKlKLUFkSm2RhE

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

# Apna Code Reviewer

An AI-powered code reviewer and mini-IDE that uses the Gemini API to analyze, improve, and run code snippets. Features a beautiful UI, custom themes, and PWA support for installable app experience.

---

## Features
- **AI Code Review:** Get instant feedback, suggestions, and corrections for your code using Gemini AI.
- **Code Execution:** Run code snippets and view output directly in the app.
- **Multi-Language Support:** Review and run code in popular languages (JavaScript, TypeScript, Python, Java, C#, C, C++, Go, Rust, PHP, Ruby, Swift, HTML, CSS).
- **Custom Themes & Dark Mode:** Personalize your experience with multiple themes and light/dark mode.
- **Notes Canvas:** Jot down notes and download them as text files.
- **PWA:** Installable as a native app with offline support.

---

## Tech Stack
- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (CDN, custom themes)
- **AI Integration:** Gemini API (`@google/genai`)
- **PWA:** Service Worker, Manifest

---

## Project Structure
```
├── App.tsx
├── components/
│   ├── CodeInput.tsx
│   ├── ExecutionOutput.tsx
│   ├── Header.tsx
│   ├── NotesCanvas.tsx
│   ├── ReviewFeedback.tsx
│   ├── RightPanel.tsx
│   ├── Spinner.tsx
│   ├── ThemeModeToggle.tsx
│   ├── ThemeSelector.tsx
│   ├── ThemeToggle.tsx
│   ├── Timer.tsx
│   └── icons/
│       └── SeverityIcons.tsx
├── constants.ts
├── index.html
├── index.tsx
├── manifest.json
├── metadata.json
├── package.json
├── services/
│   └── geminiService.ts
├── sw.js
├── themes.ts
├── tsconfig.json
├── types.ts
├── vite.config.ts
└── .env.local
```

---

## Setup & Development

### Prerequisites
- Node.js (v18+ recommended)

### Installation
1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd apna-code-reviewer
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your-gemini-api-key-here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

---

## Environment Variables
- **GEMINI_API_KEY**: Your Gemini API key (required for AI features)
- Never commit `.env.local` or your API key. `.gitignore` is set up to protect secrets.

---

## Architecture & Workflow
- **React Components:** Modular, reusable UI components.
- **Service Layer:** All AI interactions handled in `services/geminiService.ts`.
- **State Management:** React hooks, localStorage for theme and notes persistence.
- **Styling:** Dynamic CSS variables for themes, Tailwind CSS utilities.
- **PWA:** Service worker caches assets, manifest enables installable experience.

---

## Deployment

### Recommended Platforms
- **Vercel** or **Netlify** (best for Vite/React projects)
- **Firebase Hosting**
- **AWS Amplify** or **Azure Static Web Apps**

### Steps
1. Build the project:
   ```
   npm run build
   ```
2. Set `GEMINI_API_KEY` in your hosting platform’s environment settings.
3. Deploy the `dist/` folder or connect your repo for automatic deployment.

---

## Security Notes
- API keys and secrets are loaded via environment variables and never exposed in code.
- `.env.local` and all `.env*` files are ignored by git.

---

## License
MIT

---

## Credits
- Powered by [Google Gemini API](https://ai.google.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

---

## Contact
For questions or support, open an issue or contact the maintainer.
