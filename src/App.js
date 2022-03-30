import NotFound from './routes/notfound';
import Home from './modules/home/home';
import Menu from './modules/home/menu';
import Contacto from './modules/home/contact';
import Login from './modules/admin/login';
import Admin from './modules/admin/admin';
import Dishes from './modules/admin/Dishes';
import InsertDish from './modules/admin/InsertDish';
import AllDishes from './modules/admin/AllDishes';
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
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/Dishes" element={<Dishes />}></Route>
        <Route path="/InsertDish" element={<InsertDish />}></Route>
        <Route path="/AllDishes" element={<AllDishes />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  </div>
  );
}