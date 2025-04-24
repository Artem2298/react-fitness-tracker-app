🧑‍💻 Frontend aplikace ArtoFit

Tento projekt je frontendová část aplikace ArtoFit vytvořená pomocí React + Vite + Tailwind CSS. Komunikuje s backendovým API (např. na http://localhost:3000) a umožňuje uživateli spravovat tréninky a profil.

1. Instaluj závislosti:
npm install

2. Spusť vývojový server:
npm run dev
Frontend poběží na adrese http://localhost:5173

🛠️ Použité technologie
React 19
React Router DOM
Vite – rychlý bundler pro vývoj
Tailwind CSS – pro stylování
Axios – pro komunikaci s backendem
React Modal – pro modální okna
Radix UI + shadcn-ui – pro přístupné UI komponenty

📁 Struktura projektu
src/
├── components/         # Znovupoužitelné komponenty UI
├── context/            # Context API (např. UserContext)
├── pages/              # Jednotlivé stránky aplikace (Home, Profile, atd.)
├── router/             # Definice tras (React Router)
├── App.jsx             # Kořenová komponenta
├── main.jsx            # Vstupní bod Reactu
├── index.css           # Globální styly (Tailwind)


🔗 Důležité poznámky
Backend musí být spuštěn na http://localhost:3000, nebo změň URL ve fetch/axios voláních.
