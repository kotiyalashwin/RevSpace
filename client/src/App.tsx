import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Testimonial from "./pages/Testimonial";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Insights from "./pages/Insights";
import Testimonials from "./pages/Testimonials";
import TestimonialsEmbed from "./pages/TestimonialsEmbed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/testimonial/:link" element={<Testimonial />} />
        <Route path="/insights/:link" element={<Insights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/testimonials/:link" element={<TestimonialsEmbed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
