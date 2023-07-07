// import { StrictMode } from "react";
// import { ThemeProvider } from "styled-components";
// import { defaultTheme } from "/src/thems/default";
// import { createRoot } from "react-dom/client";

// import App from "/src/components/app/app";

// const rootElement = createRoot(document.getElementById("root"));
// rootElement.render(
//   <StrictMode>
//     <ThemeProvider theme={defaultTheme}>
//       <App />
//     </ThemeProvider>
//   </StrictMode>
// );

import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "/src/components/app/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "/src/thems/default";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
  rootElement
);
