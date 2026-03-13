import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-8xl font-extrabold text-orange-500/30">404</p>
      <h1 className="text-2xl font-bold text-white mt-4">Stránka nenalezena</h1>
      <p className="text-gray-400 mt-2 max-w-sm">
        Tato stránka neexistuje nebo byla přesunuta.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
      >
        Zpět na domů
      </Link>
    </div>
  );
}