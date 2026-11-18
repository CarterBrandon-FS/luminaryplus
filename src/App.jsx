import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Subscription from "./pages/Subscription";
import Setting from "./pages/Setting";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="*" element={<Dashboard />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
