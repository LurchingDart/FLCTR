import { BrowserRouter, Routes, Route } from 'react-router';
import LandingPage from '@/pages/Landing.tsx';
import AppPage from '@/pages/App.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
