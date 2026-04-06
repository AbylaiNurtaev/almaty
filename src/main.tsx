
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { PublicOfferPage } from "./app/components/PublicOfferPage";
import { LanguageProvider } from "./app/context/LanguageContext";
import "./styles/index.css";

const path = window.location.pathname;
const root = createRoot(document.getElementById("root")!);

if (path === "/public-offer") {
  root.render(
    <LanguageProvider>
      <PublicOfferPage />
    </LanguageProvider>,
  );
} else {
  root.render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );
}
  