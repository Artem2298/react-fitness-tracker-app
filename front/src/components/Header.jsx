import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-center items-center gap-44">
      <span className="text-xl text-orange-600 font-bold">ArtoFit</span>
      <Link to="/" className="hover:text-orange-400 font-bold">Domů</Link>
      <Link to="/about" className="hover:text-orange-400 font-bold">O nás</Link>
      <Link to="/trainings" className="hover:text-orange-400 font-bold">Moje tréninky</Link>
      <Link to="/userProfile" className="hover:text-orange-400 font-bold">Můj profil</Link>
    </nav>
  );
}
