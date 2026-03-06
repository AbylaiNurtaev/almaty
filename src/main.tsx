
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { PublicOfferPage } from "./app/components/PublicOfferPage";
import "./styles/index.css";

const path = window.location.pathname;
const root = createRoot(document.getElementById("root")!);

if (path === "/public-offer") {
  root.render(<PublicOfferPage />);
} else {
  root.render(<App />);
}
  