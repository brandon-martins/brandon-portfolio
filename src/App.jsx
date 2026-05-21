import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import Home from './pages/Home.jsx';
import BackToTopButton from './common/BackToTopButton.jsx';

export default function App() {
  return (
    <div className="noise">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <BackToTopButton />
    </div>
  );
}
