import React, { Fragment, useEffect } from "react";

import { ThemeProvider } from "styled-components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyles from "./index.css";

import theme from "utlis/theme";

import { useTranslation } from "react-i18next";

import { Navigation, Wrapper, LoadingIndicator, Button } from "components";

import { connect } from "react-redux";
import {
  fetchBudget,
  fetchBudgetedCategories,
} from "data/actions/budget.actions";

function App({ budget, fetchBudget }) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
  }, [fetchBudget, fetchBudgetedCategories]);

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
            <Route path="/budget">Budget Page</Route>
          </Switch>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
}

const ConnectedApp = connect(
  (state) => {
    return {
      budget: state.budget.budget,
    };
  },
  { fetchBudget }
)(App);

function RootApp() {
  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      <ConnectedApp />
    </React.Suspense>
  );
}

export default RootApp;
