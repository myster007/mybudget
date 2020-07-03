import React, { Fragment } from "react";

// import { ThemeProvider } from "styled-components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyles from "./index.css";

// import theme from "utlis/theme";

import { useTranslation } from "react-i18next";

import { Navigation, Wrapper, LoadingIndicator, Button } from "components";

// import {
//   fetchBudget,
//   fetchBudgetedCategories,
// } from "data/actions/budget.actions";
import Budget from "pages/Budget";

function App({ budget, fetchBudget }) {
  const { i18n } = useTranslation();
  return (
    <Fragment>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            { content: "Homepage", to: "/" },
            { content: "Budget", to: "/Budget" },
          ]}
          RightElement={
            <div>
              <Button
                variant="inline"
                onClick={() => i18n.changeLanguage("pl")}
              >
                pl
              </Button>
              <Button
                variant="inline"
                onClick={() => i18n.changeLanguage("eng")}
              >
                eng
              </Button>
            </div>
          }
        />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              niwigwifwqapfibfpa
            </Route>
            <Route path="/budget">
              <Budget />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </Fragment>
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
