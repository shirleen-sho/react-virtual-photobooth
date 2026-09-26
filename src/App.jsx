import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Photobooth from "./pages/Photobooth";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="photobooth" element={<Photobooth />} />
          <Route path="FAQ" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
