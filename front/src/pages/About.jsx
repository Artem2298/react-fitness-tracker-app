export default function About() {
  return (
    <div className="space-y-6 pl-10 pr-10 text-white">
      <h1 className="text-2xl font-bold text-orange-400">O nás</h1>

      <p className="text-md">
        Tento projekt <span className="font-semibold text-orange-300">ArtoFit</span> byl vytvořen jako součást předmětu <strong>VAJ (Vývoj aplikací v JavaScriptu)</strong> na univerzitě.
      </p>

      <p className="text-md">
        Za vývojem stojí student <strong>Kuznecov Artem</strong>, známý také pod přezdívkou <span className="font-mono text-orange-400">KUZ0061</span>. Projekt vytvořil kompletně sám.
      </p>

      <p className="text-md">
        V rámci vývoje poprvé pracoval s technologiemi jako <strong>React</strong>, <strong>Prisma</strong>, <strong>Tailwind CSS</strong> a knihovnou <strong>shadcn/ui</strong>.
      </p>

      <p className="text-md">
        Artem se věnuje sportu – běhu, plavání a cyklistice – a vždy chtěl vytvořit aplikaci, která by pomohla sledovat tréninky. <strong>ArtoFit</strong> je první verzí této myšlenky. 
        Cílem je v budoucnu aplikaci dále rozšiřovat a přinášet nové funkce.
      </p>

      <div className="pt-4 border-t border-gray-600">
        <p className="text-sm text-gray-400">
          © 2025 Arťom Kuznecov – <span className="font-mono text-orange-400">KUZ0061</span>
        </p>
        <p className="text-sm text-gray-400">
          Kontakt: <a href="mailto:papakarlo9822@gmail.com" className="underline hover:text-orange-300">papakarlo9822@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
