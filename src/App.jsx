import "./App.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "./Welcome";
import { Articles } from "./Articles";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="*" element={<p>page not found</p>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
