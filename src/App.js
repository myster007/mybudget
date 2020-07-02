import React from "react";

import { ThemeProvider } from "styled-components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyles from "./index.css";

import theme from "utlis/theme";

import { useTranslation } from "react-i18next";

import { Navigation, Wrapper, LoadingIndicator } from "components";

function App() {
  const { i18n } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            { content: "Homepage", to: "/" },
            { content: "Budget", to: "/Budget" },
          ]}
          RightElement={
            <div>
              <button onClick={() => i18n.changeLanguage("pl")}>pl</button>
              <button onClick={() => i18n.changeLanguage("eng")}>eng</button>
            </div>
          }
        />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              Homepage
            </Route>
            <Route path="/budget">Budget Page</Route>
          </Switch>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
}

function RootApp() {
  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      <App />
    </React.Suspense>
  );
}

export default RootApp;
