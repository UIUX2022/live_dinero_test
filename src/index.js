import React from "react";
import ReactDOM from "react-dom/client";
import './css/style.scss';
import "antd/dist/antd.min.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import axios from "axios";


axios.defaults.baseURL = "https://buyer.storak.qa/api/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
