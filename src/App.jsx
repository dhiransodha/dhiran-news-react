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
import { Alert } from "react-bootstrap";

function App() {
  if (!JSON.parse(localStorage.getItem("user")))
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: null,
        name: null,
        avatar_url: "./assets/blank-profile-picture.png",
      })
    );
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
        <Route
          path="*"
          element={
            <Alert key="page-not-found" variant="danger">
              page not found
            </Alert>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
