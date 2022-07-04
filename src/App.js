import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Category from "./pages/Category";
import ItemPage from "./pages/ItemPage";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="category/:id" element={<Category />} />
        <Route path="item/:id" element={<ItemPage />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App