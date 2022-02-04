import Home from './routes/home';
import Invoices from './routes/invoices';
import Expenses from './routes/expenses';
import NotFound from './routes/notfound';
import { Routes, Route, Link } from "react-router-dom";



export default function App() {
  return (
    <div className="App">
    {/* <nav>...</nav> */}
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="invoices" element={<Invoices />}></Route>
        <Route path="expenses" element={<Expenses />}></Route>
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