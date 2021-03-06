// import React, { Fragment } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import GlobalStyles from './index.css';

// import theme from "utlis/theme";

// import { useTranslation } from "react-i18next";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { ReactQueryConfigProvider } from 'react-query';
// import { Navigation, Wrapper, LoadingIndicator, Button } from "components";

// // import {
// //   fetchBudget,
// //   fetchBudgetedCategories,
// // } from 'data/actions/budget.actions';
// import Budget from 'pages/Budget';
// import { ThemeProvider } from 'styled-components';

// toast.configure();

// function App({ budget, fetchBudget, fetchBudgetedCategories }) {
//   const { i18n } = useTranslation();
//   return (
//     <Fragment>
//       <GlobalStyles />
//       <Router>
//         <Navigation
//           items={[
//             { content: 'Homepage', to: '/' },
//             { content: 'budget', to: '/budget' },
//           ]}
//           RightElement={(
//             <div>
//               <Button variant="regular" onClick={() => i18n.changeLanguage('pl')}>pl</Button>
//               <Button variant="regular" onClick={() => i18n.changeLanguage('en')}>en</Button>
//             </div>
//           )}
//         />

//         <Wrapper>
//           <Switch>
//             <Route exact path="/">
//               Homepage
//             </Route>
//             <Route path="/budget">
//               <Budget />
//             </Route>
//           </Switch>
//         </Wrapper>
//       </Router>
//     </Fragment>
//   );
// }

// const queryConfig = {
//   suspense: true,
//   refetchAllOnWindowFocus: false,
// }

// function RootApp() {
//   return (
//     <ReactQueryConfigProvider config={queryConfig}>
//       <ThemeProvider theme={theme}>
//         <React.Suspense fallback={<LoadingIndicator />}>
//           <App />
//         </React.Suspense>
//       </ThemeProvider>
//     </ReactQueryConfigProvider>
//   )
// }

// export default RootApp;

import React, { Fragment, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import GlobalStyles from 'index.css';
import { SuspenseErrorBoundary, Navigation, Button } from 'components';
import theme from 'theme';

import Budget from './pages/Budget';

const RootPage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback(lng => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  return (
    <Fragment>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            { content: 'Home', to: '/' },
            { content: 'Budget', to: '/budget' },
          ]}
          RightElement={(
            <div>
              <Button
                variant="regular"
                primary={i18n.language === 'pl'}
                onClick={() => changeLanguage('pl')}
              >
                pl
              </Button>
              <Button
                variant="regular"
                primary={i18n.language === 'en'}
                onClick={() => changeLanguage('en')}
              >
                en
              </Button>
            </div>
          )}
        />

        <Switch>
          <Route exact path="/">
            {t('Home')}
          </Route>
          <Route path="/budget">
            <SuspenseErrorBoundary>
              <Budget />
            </SuspenseErrorBoundary>
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
function App() {
  return (
    <ThemeProvider theme={theme}>
      <SuspenseErrorBoundary>
        <RootPage />
      </SuspenseErrorBoundary>
    </ThemeProvider>
  );
}

export default App;