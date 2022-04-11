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
import BusinessUnit from './modules/admin/BusinessUnit';
import InsertBusinessUnit from './modules/admin/InsertBusinessUnit';
import AllBusinessUnit from './modules/admin/AllBusinessUnit';
import TypeUser from './modules/admin/TypeUser';
import InsertTypeUser from './modules/admin/InsertTypeUser';
import AllTypeUser from './modules/admin/AllTypeUser';
import User from './modules/admin/User';
import InsertUser from './modules/admin/InsertUser';
import AllUser from './modules/admin/AllUser';
import UserBusinessUnit from './modules/admin/UserBusinessUnit';
import InsertUserBusinessUnit from './modules/admin/InsertUserBusinessUnit';
import AllUserBusinessUnit from './modules/admin/AllUserBusinessUnit';
import Product from './modules/admin/Product';
import InsertProduct from './modules/admin/InsertProduct';
import AllProduct from './modules/admin/AllProduct';
import Extra from './modules/admin/Extra';
import InsertExtra from './modules/admin/InsertExtra';
import AllExtra from './modules/admin/AllExtra';
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
        <Route path="/BusinessUnit" element={<BusinessUnit />}></Route>
        <Route path="/InsertBusinessUnit" element={<InsertBusinessUnit />}></Route>
        <Route path="/AllBusinessUnit" element={<AllBusinessUnit />}></Route>
        <Route path="/TypeUser" element={<TypeUser />}></Route>
        <Route path="/InsertUserType" element={<InsertTypeUser />}></Route>
        <Route path="/AllTypeUser" element={<AllTypeUser />}></Route>
        <Route path="/User" element={<User />}></Route>
        <Route path="/InsertUser" element={<InsertUser />}></Route>
        <Route path="/AllUser" element={<AllUser />}></Route>
        <Route path="/UserBusinessUnit" element={<UserBusinessUnit />}></Route>
        <Route path="/InsertUserBusinessUnit" element={<InsertUserBusinessUnit />}></Route>
        <Route path="/AllUserBusinessUnit" element={<AllUserBusinessUnit />}></Route>
        <Route path="/Product" element={<Product />}></Route>
        <Route path="/InsertProduct" element={<InsertProduct />}></Route>
        <Route path="/AllProduct" element={<AllProduct />}></Route>
        <Route path="/Extra" element={<Extra />}></Route>
        <Route path="/InsertExtra" element={<InsertExtra />}></Route>
        <Route path="/AllExtra" element={<AllExtra />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  </div>
  );
}