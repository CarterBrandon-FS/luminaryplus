import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
