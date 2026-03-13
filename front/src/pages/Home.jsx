import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Post from '../components/Post';

export default function Home() {
  const user = useUser();
  if (!user) return <p className="text-white p-8">Načítání...</p>;

  return (
    <div className="py-8">
      {/* Hero section */}
      <div className="text-center py-12 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Vítej v <span className="text-orange-500">ArtoFit</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
          Sleduj své tréninky, sdílej výsledky a posouvej své limity. Běh, kolo, plavání — vše na jednom místě.
        </p>
        <Link
          to="/trainings"
          className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
        >
          Začít trénink
        </Link>
      </div>

      {/* Public trainings feed */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-orange-500 rounded-full" />
          Veřejné tréninky
        </h2>
        <Post />
      </div>
    </div>
  );
}
