import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Testimonial from "./pages/Testimonial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/testimonial" element={<Testimonial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
