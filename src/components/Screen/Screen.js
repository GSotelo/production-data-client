import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Switch, Route } from "react-router-dom";
import { Monitoring } from "./utilities/lazyLoad";
import routeCategories from "./utilities/routes";
import { Spin } from 'antd';

const Screen = () => (
  <ErrorBoundary>
    <Suspense fallback={<Spin size="large" />}>
      <Switch>
        <Route exact path="/">
          <Monitoring />
        </Route>
        {
          routeCategories.map(routeCategory => routeCategory.map(
            route =>
              <Route
                key={route.key}
                path={route.path}
              >
                {route.screen}
              </Route>
          ))
        }
      </Switch>
    </Suspense>
  </ErrorBoundary>
);

export default Screen;