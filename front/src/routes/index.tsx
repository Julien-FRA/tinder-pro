import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import UserPage from '../features/user/UserPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}
