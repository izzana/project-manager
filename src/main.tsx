// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import React from 'react';
// import ReactDOM from 'react-dom';

// async function prepareMocks() {
//   if (import.meta.env.DEV) {
//     const { worker } = await import("./mocks/browser");
//     await worker.start({ onUnhandledRequest: "bypass" });
//   }
// }

// prepareMocks().then(() => {
//   ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// });

import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'

async function prepareMocks() {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}

prepareMocks().then(() => {
  const rootElem = document.getElementById("root");
  if (!rootElem) throw new Error("Elemento #root não encontrado");

  ReactDOM.createRoot(rootElem).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
