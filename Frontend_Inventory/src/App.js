import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import AddProduct from "./AdminPages/AddProduct";
import DashBoard from "./AdminPages/DashBoard";
import Order from "./AdminPages/Order";
import Product from "./AdminPages/Product";
import Sales from "./AdminPages/Sales";
import Stock from "./AdminPages/Stock";
import UpdateProduct from "./AdminPages/UpdateProduct";
import { CartProvider } from "./ContextApi/CartContext";
import { CountsProvider } from "./ContextApi/CountsContext";
import { CustomerProvider } from "./ContextApi/CustomerContext";
import { OrdersProvider } from "./ContextApi/OrderContext";
import Account from "./CustomerPages/Account";
import Cart from "./CustomerPages/Cart";
import DashboardPage from "./CustomerPages/DashboardPage"; // New Interactive Dashboard
import HomePage from "./CustomerPages/HomePage";
import OrderForm from "./CustomerPages/OrderForm";
import Orders from "./CustomerPages/Orders";
import ProductPage from "./CustomerPages/ProductPage";
import SinglePageProduct from "./CustomerPages/SinglePageProduct";
import SingleProductCart from "./CustomerPages/SingleProudctCart";
import Admin from "./Login _signup_pages/Admin";
import Customer from "./Login _signup_pages/Customer";
import ForgotPassword from "./Login _signup_pages/ForgotPassword";
import LandingPage from "./Login _signup_pages/LandingPage";
import Login from "./Login _signup_pages/Login";
import ResetPassword from "./Login _signup_pages/PasswordReset";
import SignUp from "./Login _signup_pages/SignUp";
import { UserProvider } from "./Login _signup_pages/UserContext";
import VerifyOTP from "./Login _signup_pages/VerifyOTP";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component

const App = () => {
  return (
    <CustomerProvider>
      <ToastContainer /> {/* Toast container for notifications */}
      <OrdersProvider>
        <CartProvider>
          <UserProvider>
            <CountsProvider>
              <Router>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/verify-otp" element={<VerifyOTP />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  />

                  {/* Admin Routes - Protected */}
                  <Route
                    path="/admin/:userId/*"
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="interactive-dashboard" element={<DashboardPage />} />
                    <Route path="product" element={<Product />} />
                    <Route path="order" element={<Order />} />
                    <Route path="stock" element={<Stock />} />
                    <Route path="sales" element={<Sales />} />
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route
                      path="updateproduct/:productId"
                      element={<UpdateProduct />}
                    />
                  </Route>

                  {/* Customer Routes - Protected */}
                  <Route
                    path="/customer/:userId/*"
                    element={
                      <ProtectedRoute>
                        <Customer />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="home" element={<HomePage />} />
                    <Route path="product" element={<ProductPage />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="account" element={<Account />} />
                    <Route path="cart" element={<Cart />} />
                    <Route
                      path="singleproductcart"
                      element={<SingleProductCart />}
                    />
                    <Route
                      path="singleproduct/:productId"
                      element={<SinglePageProduct />}
                    />
                    <Route path="orderform" element={<OrderForm />} />
                  </Route>
                </Routes>
              </Router>
            </CountsProvider>
          </UserProvider>
        </CartProvider>
      </OrdersProvider>
    </CustomerProvider>
  );
};

export default App;
