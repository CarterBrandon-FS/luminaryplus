import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Subscription from "./pages/Subscription";
import Setting from "./pages/Setting";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="*" element={<Dashboard />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </>
  );
}

export default App;
