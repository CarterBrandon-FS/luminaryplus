import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Subscription from "./pages/Subscription";
import Setting from "./pages/Setting";
import Kids from "./pages/Kids";
import Series from "./pages/Series";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TVDetails from "./pages/TVDetails";

import "./styles/Navbar.css";
import "./styles/Footer.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="*" element={<Dashboard />} />
        <Route path="/subscriptions" element={<Subscription />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/series" element={<Series />} />
        <Route path="/tv/:id" element={<TVDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
