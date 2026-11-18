import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Subscription from "./pages/Subscription";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="*" element={<Dashboard />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </>
  );
}

export default App;
