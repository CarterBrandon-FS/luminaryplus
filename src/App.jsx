import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
