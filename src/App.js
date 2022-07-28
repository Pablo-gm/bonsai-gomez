import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { db } from "./firebase/firebase";
import { collection, getDocs } from 'firebase/firestore';

import CartContext from "./context/CartContext";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ItemPage from "./pages/ItemPage";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const App = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const categoriesCollection = collection(db,'categories');
    return getDocs(categoriesCollection);
  }

  // On mount, get categories
  React.useEffect(() => {
    getCategories()
    .then(res => {
      const tempCategories = res.docs.map(
        (c) => {
          return { ...c.data() };
        } 
      )
      setCategories(tempCategories);
    }, err => {
      console.log("Rejected: " + err);
    })
    .catch(err => console.log('Error: ' + err))
  }, []);

  return (
    <CartContext>
      <BrowserRouter>
        { categories.length ? <NavBar categoryLinks={categories}/> : ''}
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="category/:id" element={<Category availableCategories={categories} />} />
          <Route path="item/:id" element={<ItemPage />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </CartContext>
  )
}

export default App