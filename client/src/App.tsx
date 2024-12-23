import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Testimonial from "./pages/Testimonial";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TestimonialVideos from "./pages/TestimonialVideos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/testimonial/:link" element={<Testimonial />} />
        <Route path="/testimonials" element={<TestimonialVideos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
