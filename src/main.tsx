import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'

async function prepareMocks() {
  if (typeof window !== "undefined") {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
  }
}

prepareMocks().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});