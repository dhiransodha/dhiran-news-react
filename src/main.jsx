import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <ErrorProvider>
        <LoadingProvider> */}
    {/* <UserProvider> */}
    <App />
    {/* </UserProvider> */}
    {/* </LoadingProvider>
      </ErrorProvider> */}
  </BrowserRouter>
);
