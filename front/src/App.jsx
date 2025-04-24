import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="p-4 bg-zinc-700 px-60">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
