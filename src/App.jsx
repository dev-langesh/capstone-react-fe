import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Layout from "./components/home/Layout";
import AdminDashboard from "./pages/admin";
import AddProduct from "./pages/products/add-product";
import ProductsPage from "./pages/products";
import ProductDetails from "./pages/products/product-details";
import Home from "./pages/Home";
import ModeContextComponent from "./context/ModeContext";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CartHome from "./pages/cart";

function App() {
  return (
    <Provider store={store}>
      <ModeContextComponent>
        <Layout>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/products/add-product" element={<AddProduct />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<CartHome />} />
            </Routes>
          </Router>
        </Layout>
      </ModeContextComponent>
    </Provider>
  );
}

export default App;
