import NotFound from './routes/notfound';
import Home from './modules/home/home';
import Menu from './modules/home/menu';
import Contacto from './modules/home/contact';
import Login from './modules/admin/login';
import Admin from './modules/admin/admin';
import Dishes from './modules/admin/Dishes';
import InsertDish from './modules/admin/InsertDish';
import AllDishes from './modules/admin/AllDishes';
import TypeDish from './modules/admin/typeDish';
import InsertTypeDish from './modules/admin/insertTypeDish';
import AllTypeDish from './modules/admin/AllTypeDish';
import TypePermission from './modules/admin/TypePermission';
import InsertTypePermission from './modules/admin/InsertTypePermission';
import AllTypePermission from './modules/admin/AllTypePermission';
import TypeRole from './modules/admin/TypeRole';
import InsertTypeRole from './modules/admin/InsertTypeRole';
import AllTypeRole from './modules/admin/AllTypeRole';
import PermissionRole from './modules/admin/PermissionRole';
import InsertPermissionRole from './modules/admin/InsertPermissionRole';
import AllPermissionRole from './modules/admin/AllPermissionRole';
import Role from './modules/admin/Role';
import InsertRole from './modules/admin/InsertRole';
import AllRole from './modules/admin/AllRole';
import State from './modules/admin/State';
import InsertState from './modules/admin/InsertState';
import AllState from './modules/admin/AllState';
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
import DishesDisplay from './modules/waiter/dishesDisplay';
import AllOrder from './modules/waiter/AllOrder';
import ModifyOrder from './modules/waiter/ModifyOrder';
import BillingByOrder from './modules/Billing/BillingByOrder';
import AllBillingOrder from './modules/Billing/AllBillingOrder';
import WelcomeCenter from './modules/generic/WelcomeCenter';
import DishesCenter from './modules/generic/DishesCenter';
import SalesCenter from './modules/generic/SalesCenter';
import UsersCenter from './modules/generic/UsersCenter';

import { Routes, Route } from "react-router-dom";
import { useState } from "react";


export default function App() {

  const [logged, setLogged] = useState(true);


  return (
    <div className="main-body">
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/contact" element={<Contacto />}></Route>
          <Route path="/logincalafate" element={<Login />}></Route>



          <Route path="/admin" element={ logged ? <Admin /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/Dishes" element={ logged ? <Dishes /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertDish" element={ logged ? <InsertDish /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllDishes" element={ logged ? <AllDishes /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/TypeDish" element={ logged ? <TypeDish /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertTypeDish" element={ logged ? <InsertTypeDish /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllTypeDish" element={ logged ? <AllTypeDish /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/TypePermission" element={ logged ? <TypePermission /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertTypePermission" element={ logged ? <InsertTypePermission /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllTypePermission" element={ logged ? <AllTypePermission /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/TypeRole" element={ logged ? <TypeRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertTypeRole" element={ logged ? <InsertTypeRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllTypeRole" element={ logged ? <AllTypeRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/PermissionRole" element={ logged ? <PermissionRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertPermissionRole" element={ logged ? <InsertPermissionRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllPermissionRole" element={ logged ? <AllPermissionRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/Role" element={ logged ? <Role /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertRole" element={ logged ? <InsertRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllRole" element={ logged ? <AllRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/State" element={ logged ? <State /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertState" element={ logged ? <InsertState /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllState" element={ logged ? <AllState /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/OrderState" element={ logged ? <OrderState /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertOrderState" element={ logged ? <InsertOrderState /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllOrderState" element={ logged ? <AllOrderState /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/BusinessUnit" element={ logged ? <BusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertBusinessUnit" element={ logged ? <InsertBusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllBusinessUnit" element={ logged ? <AllBusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/TypeUser" element={ logged ? <TypeUser /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertUserType" element={ logged ? <InsertTypeUser /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllTypeUser" element={ logged ? <AllTypeUser /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/User" element={ logged ? <User /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertUser" element={ logged ? <InsertUser /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllUser" element={ logged ? <AllUser /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/UserBusinessUnit" element={ logged ? <UserBusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertUserBusinessUnit" element={ logged ? <InsertUserBusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllUserBusinessUnit" element={ logged ? <AllUserBusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/Product" element={ logged ? <Product /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertProduct" element={ logged ? <InsertProduct /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllProduct" element={ logged ? <AllProduct /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/Extra" element={ logged ? <Extra /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertExtra" element={ logged ? <InsertExtra /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllExtra" element={ logged ? <AllExtra /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/DishesDisplay" element={ logged ? <DishesDisplay /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllOrder" element={ logged ? <AllOrder /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/ModifyOrder" element={ logged ? <ModifyOrder /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/BillingByOrder" element={ logged ? <BillingByOrder /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllBillingOrder" element={ logged ? <AllBillingOrder /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/WelcomeCenter" element={logged ? <WelcomeCenter /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/UsersCenter" element={ logged ? <UsersCenter /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/DishesCenter" element={ logged ? <DishesCenter /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/SalesCenter" element={ logged ? <SalesCenter /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

