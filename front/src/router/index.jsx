import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import UserProfile from '@/pages/UserProfile';
import TrainingPage from '@/pages/TrainingPage';

export default function AppRoutes() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/trainings', element: <TrainingPage /> },
    { path: '/profile', element: <UserProfile /> },
    { path: '*', element: <NotFound /> }
  ]);

  return routes;
}