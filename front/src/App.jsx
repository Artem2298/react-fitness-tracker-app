import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="min-h-screen bg-zinc-700 px-4 md:px-8 lg:px-16 xl:px-32">
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}

export default App;
