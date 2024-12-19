import "./App.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "./Welcome";
import { Articles } from "./Articles";
import { Article } from "./Article";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Welcome user={user} />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
        <Route path="/sign-out" element={<SignOut setUser={setUser} />} />
        <Route path="*" element={<p>page not found</p>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
