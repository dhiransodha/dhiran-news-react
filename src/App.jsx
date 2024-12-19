import "./App.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "./Welcome";
import { Articles } from "./Articles";
import { Article } from "./Article";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="*" element={<p>page not found</p>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
