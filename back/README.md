🏃 Backend pro aplikaci tréninku
Tento projekt je backendová část tréninkové aplikace postavená pomocí Node.js, Express a Prisma ORM se SQLite databází.

📦 Instalace
1. Klonuj repozitář nebo stáhni tento projekt do svého počítače:
git clone https://github.com/2025s-project-kuz0061.git

2. Nainstaluj závislosti:
npm install

3. Spusť migraci databáze:
npm run migrate

4. Spuštění serveru
npm run dev

🔧 Dostupné skripty
Skript          |   Popis
npm run dev     |   Spustí server s nodemon
npm start       |   Spustí server klasicky pomocí Node.js
npm run db      |   Spustí Prisma Studio
npm run migrate |   Spustí migraci databáze
npm run seed    |   Seeduje databázi daty (pokud existuje skript)

🛠 Použité technologie
Node.js
Express.js
Prisma ORM
SQLite jako databáze
dotenv pro správu proměnných prostředí
nodemon pro vývoj