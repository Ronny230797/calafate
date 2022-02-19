import NotFound from './routes/notfound';
import Home from './modules/home/home';
import Menu from './modules/home/menu';
import Contacto from './modules/home/contact';
import Login from './modules/admin/login';
import { Routes, Route } from "react-router-dom";



export default function App() {
  return (
    <div className="main-body">
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/contact" element={<Contacto />}></Route>
        <Route path="/logincalafate" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  </div>
  );
}