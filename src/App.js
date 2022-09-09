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
import { useEffect, useState } from "react";



export default function App() {

  const [logged, setLogged] = useState();


  useEffect(() => {

      const item = localStorage.getItem('ABRLGN');
      console.log(item)
      localStorage.setItem('ABRLGN', item);
      setLogged(item)
  }, []);

  


  return (
    <div className="main-body">
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/contact" element={<Contacto />}></Route>
          <Route path="/logincalafate" element={<Login />}></Route>



          <Route path="/admin" element={ logged=='true' ? <Admin /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/Dishes" element={ logged=='true' ? <Dishes /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertDish" element={ logged=='true' ? <InsertDish /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllDishes" element={ logged=='true' ? <AllDishes /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/TypeDish" element={ logged=='true' ? <TypeDish /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertTypeDish" element={ logged=='true' ? <InsertTypeDish /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllTypeDish" element={ logged=='true' ? <AllTypeDish /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/TypePermission" element={ logged=='true' ? <TypePermission /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertTypePermission" element={ logged=='true' ? <InsertTypePermission /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllTypePermission" element={ logged=='true' ? <AllTypePermission /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/TypeRole" element={ logged=='true' ? <TypeRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertTypeRole" element={ logged=='true' ? <InsertTypeRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllTypeRole" element={ logged=='true' ? <AllTypeRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/PermissionRole" element={ logged=='true' ? <PermissionRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertPermissionRole" element={ logged=='true' ? <InsertPermissionRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllPermissionRole" element={ logged=='true' ? <AllPermissionRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/Role" element={ logged=='true' ? <Role /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertRole" element={ logged=='true' ? <InsertRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllRole" element={ logged=='true' ? <AllRole /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/State" element={ logged=='true' ? <State /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertState" element={ logged=='true' ? <InsertState /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllState" element={ logged=='true' ? <AllState /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/OrderState" element={ logged=='true' ? <OrderState /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertOrderState" element={ logged=='true' ? <InsertOrderState /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllOrderState" element={ logged=='true' ? <AllOrderState /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/BusinessUnit" element={ logged=='true' ? <BusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertBusinessUnit" element={ logged=='true' ? <InsertBusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllBusinessUnit" element={ logged=='true' ? <AllBusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/TypeUser" element={ logged=='true' ? <TypeUser /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertUserType" element={ logged=='true' ? <InsertTypeUser /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllTypeUser" element={ logged=='true' ? <AllTypeUser /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/User" element={ logged=='true' ? <User /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertUser" element={ logged=='true' ? <InsertUser /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllUser" element={ logged=='true' ? <AllUser /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/UserBusinessUnit" element={ logged=='true' ? <UserBusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertUserBusinessUnit" element={ logged=='true' ? <InsertUserBusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllUserBusinessUnit" element={ logged=='true' ? <AllUserBusinessUnit /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/Product" element={ logged=='true' ? <Product /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertProduct" element={ logged=='true' ? <InsertProduct /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllProduct" element={ logged=='true' ? <AllProduct /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/Extra" element={ logged=='true' ? <Extra /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/InsertExtra" element={ logged=='true' ? <InsertExtra /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllExtra" element={ logged=='true' ? <AllExtra /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/DishesDisplay" element={ logged=='true' ? <DishesDisplay /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllOrder" element={ logged=='true' ? <AllOrder /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/ModifyOrder" element={ logged=='true' ? <ModifyOrder /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/BillingByOrder" element={ logged=='true' ? <BillingByOrder /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/AllBillingOrder" element={ logged=='true' ? <AllBillingOrder /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/WelcomeCenter" element={logged=='true' ? <WelcomeCenter /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/UsersCenter" element={ logged=='true' ? <UsersCenter /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/DishesCenter" element={ logged=='true' ? <DishesCenter /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>
          <Route path="/SalesCenter" element={ logged=='true' ? <SalesCenter /> : <div>Debes hacer "Login" para ingresar a la vista ...</div>}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

