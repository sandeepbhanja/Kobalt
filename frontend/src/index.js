import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/cartScreen.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import LoginScreen from "./screens/loginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import OrderListScreen from "./screens/admin/OrderListScreen";
import AdminRoute from "./components/AdminRoute.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/sign-in" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />}></Route>
        <Route path='/payment' element={<PaymentScreen/>}></Route>
        <Route path='/placeOrder' element={<PlaceOrderScreen/>}></Route>
        <Route path='/orders/:id' element={<OrderScreen/>}></Route>
        <Route path='/profile' element={<ProfileScreen/>}></Route>
      </Route>
      <Route path="" element={<AdminRoute/>}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>}></Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
