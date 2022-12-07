import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Home} from "./components/Layouts/Home";
import {NavBar} from "./components/Header/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Products} from "./components/Layouts/Products";
import {CartProvider} from "./components/CartContext";
import {Shipping} from "./components/Layouts/Shipping";
import {Clients} from "./components/Layouts/Clients";
import Login from "./components/Layouts/Login.jsx";

function App() {

  return (
      <>

          <div className="App">
              <BrowserRouter>
                  <CartProvider>
                  <Routes>
                      <Route path={"/"} element={<Login></Login>}></Route>
                      <Route path={"/Home"} element={<Home></Home>}></Route>
                      <Route path={"/Products"} element={<Products></Products>}></Route>
                      <Route path={"/Shipping"} element={<Shipping></Shipping>}></Route>
                      <Route path={"/Client"} element={<Clients></Clients>}></Route>
                  </Routes>
                  </CartProvider>
              </BrowserRouter>
          </div>

      </>
  )
}

export default App
