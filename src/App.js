import NotFound from './routes/notfound';
import Home from './modules/home/home';
import Menu from './modules/home/menu';
import Contacto from './modules/home/contact';
import Login from './modules/admin/login';
import Admin from './modules/admin/admin';
import Dishes from './modules/admin/Dishes';
import InsertDish from './modules/admin/InsertDish';
import AllDishes from './modules/admin/AllDishes';
import TypeDish from './modules/admin/TypeDish';
import InsertTypeDish from './modules/admin/InsertTypeDish';
import AllTypeDish from './modules/admin/AllTypeDish';
import TypePermission from './modules/admin/TypePermission';
import InsertTypePermission from './modules/admin/InsertTypePermission';
import AllTypePermission from './modules/admin/AllTypePermission';
import TypeRole from './modules/admin/TypeRole';
import InsertTypeRole from './modules/admin/InsertTypeRole';
import AllTypeRole from './modules/admin/AllTypeRole';
import PermissionRole from './modules/admin/PermissionRole';
import InsertPermissionRole from './modules/admin/InsertPermissionRole';
import Role from './modules/admin/Role';
import InsertRole from './modules/admin/InsertRole';
import AllRole from './modules/admin/AllRole';
import OrderState from './modules/admin/OrderState';
import InsertOrderState from './modules/admin/InsertOrderState';
import AllOrderState from './modules/admin/AllOrderState';
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
        <Route path="/TypeDish" element={<TypeDish />}></Route>
        <Route path="/InsertTypeDish" element={<InsertTypeDish />}></Route>
        <Route path="/AllTypeDish" element={<AllTypeDish />}></Route>
        <Route path="/TypePermission" element={<TypePermission />}></Route>
        <Route path="/InsertTypePermission" element={<InsertTypePermission />}></Route>
        <Route path="/AllTypePermission" element={<AllTypePermission />}></Route>
        <Route path="/TypeRole" element={<TypeRole />}></Route>
        <Route path="/InsertTypeRole" element={<InsertTypeRole />}></Route>
        <Route path="/AllTypeRole" element={<AllTypeRole />}></Route>
        <Route path="/PermissionRole" element={<PermissionRole />}></Route>
        <Route path="/InsertPermissionRole" element={<InsertPermissionRole />}></Route>
        <Route path="/Role" element={<Role />}></Route>
        <Route path="/InsertRole" element={<InsertRole />}></Route>
        <Route path="/AllRole" element={<AllRole />}></Route>
        <Route path="/OrderState" element={<OrderState />}></Route>
        <Route path="/InsertOrderState" element={<InsertOrderState />}></Route>
        <Route path="/AllOrderState" element={<AllOrderState />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  </div>
  );
}