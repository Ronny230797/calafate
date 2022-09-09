import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../src/styles/index.scss";
import { positions, Provider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 1000,
  position: positions.BOTTOM_CENTER,
};

const AlertTemplate = ({ message }) => (
  <div className="alert">{message}</div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
     <Provider template={AlertTemplate} {...options}>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
