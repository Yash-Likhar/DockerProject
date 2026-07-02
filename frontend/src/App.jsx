import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import UpdateEmployee from "./components/UpdateEmployee";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <BrowserRouter>
        <Navbar />

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/edit/:id" element={<UpdateEmployee />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;