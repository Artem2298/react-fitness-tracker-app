import { useUser } from '../context/UserContext';
import Post from '../components/Post'

export default function Home() {
  const user = useUser();
  if (!user) return <p className="text-white">Načítání uživatele...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-orange-500 p-8">Welcome to the ArtoFit app. Let go make some training</h1>
      <Post />      
    </div>
  );
}
