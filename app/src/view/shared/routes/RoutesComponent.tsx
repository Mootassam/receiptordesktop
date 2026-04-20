import React, { useEffect, useRef } from "react";
import PrivateRoute from "./PrivateRoute";
import routes from "../../shared/routes";
import lazyRouter from "../../../view/shared/Lazyroutes";
import PublicRoute from "./PublicRoute";
import { useSelector } from "react-redux";
import authSelectors from "../../../modules/auth/authSelectors";
import ProgressBar from "../../../view/shared/ProgressBar";
import { Route, Switch } from "react-router-dom";
import EmptyPermissionsRoute from "./EmptyPermissionsRoute";


function RoutesComponent() {
  const isInitialMount = useRef(true);

  const authLoading = useSelector(authSelectors.selectLoadingInit);
  const loading = authLoading;

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const currentTenant = useSelector(authSelectors.selectCurrentTenant);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;


      ProgressBar.start();
      return;
    }

    if (!loading) {
      ProgressBar.done();
    }
  }, [loading]);





  if (loading) {
    return <div />;
  }

  return (
    <Switch>
      {routes.publicRoutes.map((route) => (
        <PublicRoute
          exact
          key={route.path}
          path={route.path}
          component={lazyRouter({ loader: route.loader })}
          currentUser={currentUser}
          currentTenant={currentTenant}
        />
      ))}





      {routes.emptyPermissionsRoutes.map((route) => (
        <EmptyPermissionsRoute
          key={route.path}
          exact
          path={route.path}
          currentUser={currentUser}
          currentTenant={currentTenant}
          component={lazyRouter({
            loader: route.loader,
          })}
        />
      ))}
      {routes.privateRoutes.map((route) => (
        <PrivateRoute
          exact
          key={route.path}
          path={route.path}
          component={lazyRouter({ loader: route.loader })}
          currentUser={currentUser}
          currentTenant={currentTenant}
          permissionRequired={route.permissionRequired}
        />
      ))}

      {routes.simpleRoutes.map((route) => (
        <Route
          key={route.path}
          exact
          path={route.path}
          component={lazyRouter({
            loader: route.loader,
          })}
        />
      ))}
    </Switch>
  );
}

export default RoutesComponent;
