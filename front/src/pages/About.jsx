import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const technologies = [
    { name: 'React', desc: 'Frontend framework' },
    { name: 'Express', desc: 'Backend server' },
    { name: 'Prisma', desc: 'ORM / databáze' },
    { name: 'Tailwind CSS', desc: 'Styling' },
    { name: 'shadcn/ui', desc: 'UI komponenty' },
    { name: 'SQLite', desc: 'Databáze' },
  ];

  return (
    <div className="py-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-extrabold text-white mb-3">
          O projektu <span className="text-orange-500">ArtoFit</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Aplikace pro sledování sportovních tréninků, vytvořená jako součást předmětu VAJ na univerzitě.
        </p>
      </div>

      {/* About the project */}
      <Card className="bg-gray-800/80 text-white border-gray-700">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-500 rounded-full" />
            O projektu
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            ArtoFit je webová aplikace pro sportovce, kteří chtějí sledovat své tréninky.
            Podporuje běh, plavání, cyklistiku, chůzi a lyžování. Můžeš zaznamenávat
            tréninky s časem, vzdáleností a sdílet je s ostatními.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Projekt byl vytvořen jako součást předmětu <strong>VAJ (Vývoj aplikací v JavaScriptu)</strong>.
            Cílem je v budoucnu aplikaci dále rozšiřovat a přinášet nové funkce.
          </p>
        </CardContent>
      </Card>

      {/* Technologies */}
      <Card className="bg-gray-800/80 text-white border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-500 rounded-full" />
            Technologie
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {technologies.map((tech) => (
              <div key={tech.name} className="bg-gray-900/50 rounded-lg p-3 text-center">
                <p className="font-semibold text-orange-400 text-sm">{tech.name}</p>
                <p className="text-xs text-gray-500 mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Author */}
      <Card className="bg-gray-800/80 text-white border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-500 rounded-full" />
            Autor
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-lg">
              AK
            </div>
            <div>
              <p className="font-semibold">Artem Kuznecov</p>
              <p className="text-xs text-gray-500 font-mono">KUZ0061</p>
              <a href="mailto:papakarlo9822@gmail.com" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
                papakarlo9822@gmail.com
              </a>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Artem se věnuje sportu — běhu, plavání a cyklistice — a vždy chtěl vytvořit
            aplikaci, která by pomohla sledovat tréninky.
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-center text-xs text-gray-600 py-4">
        © 2025 ArtoFit — Artem Kuznecov (KUZ0061)
      </p>
    </div>
  );
}
