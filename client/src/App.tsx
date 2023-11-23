import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import Team from "./pages/Team";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Shop from "./pages/Shop";
import { Footer, Header, Register, Login } from "./components";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/register" && location.pathname !== "/login" && (
        <Header />
      )}

      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />} />

          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />

          <Route path="/news" element={<News />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>
      {location.pathname !== "/register" && location.pathname !== "/login" && (
        <Footer />
      )}
    </>
  );
}

export default App;
