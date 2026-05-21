# Brandon Martins — Portfolio

Personal portfolio website for **Brandon Martins**, Full Stack Developer and Founder of [Webify (Pty) Ltd](https://www.webify.org.za).

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | React 18 + Vite 5                 |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing    | React Router v6                   |
| Language   | JavaScript (ES Modules)           |
| Backend    | None                              |
| Deployment | Vercel                            |

## Getting Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build   # outputs to /dist
```

Deploy the `/dist` folder to Vercel or Netlify.  
`vercel.json` includes SPA rewrites for React Router.

## Project Structure

```
src/
├── components/     # Hero, Navbar, About, Experience, Skills, Projects, Certifications, Contact, Footer
├── hooks/          # useReveal (scroll-triggered animations)
├── layouts/        # RootLayout
├── pages/          # Home (assembles all sections)
├── styles/         # Global CSS + Tailwind v4 entry
├── utils/          # data.js (all portfolio content)
└── App.jsx / main.jsx
```

## Content Updates

All portfolio content lives in `src/utils/data.js` — update it to change skills, experience, projects, or certifications without touching component files.

## Contact

- Email: brandon.martins@webify.org.za  
- Phone: 061 580 3040  
- Website: www.webify.org.za  
- Location: Johannesburg, Gauteng, South Africa
