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
import ProductListScreen from "./screens/admin/ProductListScreen";
import UpdateProductScreen from "./screens/admin/UpdateProductScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UpdateUserScreen from "./screens/admin/UpdateUserScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
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
        <Route path="/admin/productlist" element={<ProductListScreen/>}></Route>
        <Route path='/admin/product/:id/edit' element={<UpdateProductScreen/>}></Route>
        <Route path='/admin/orderlist' element={<OrderListScreen/>}></Route>
        <Route path='/admin/userlist' element={<UserListScreen/>}></Route>
        <Route path='/admin/user/:id/edit' element={<UpdateUserScreen/>}></Route>
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
