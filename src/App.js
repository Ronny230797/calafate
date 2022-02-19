// import Home from './modules/home/home';
import Expenses from './routes/expenses';
import NotFound from './routes/notfound';

import Home from './modules/home/home';
import Menu from './modules/home/menu';
import Contacto from './modules/home/contact';


import { Routes, Route, Link } from "react-router-dom";



export default function App() {
  return (
    <div className="main-body">
    {/* <nav>...</nav> */}
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/contact" element={<Contacto />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  </div>
    // <div>
    //   <h1>Bookkeeper</h1>
    //   <nav
    //     style={{
    //       borderBottom: "solid 1px",
    //       paddingBottom: "1rem"
    //     }}
    //   >
    //     <Link to="/invoices">Invoices</Link> |{" "}
    //     <Link to="/expenses">Expenses</Link>
    //   </nav>
    // </div>
  );
}