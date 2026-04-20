

import Permissions from "../../security/permissions";
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: "/",
    loader: () => import("../../view/Receipt"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  
];


const publicRoutes = [
  {
    path: "/auth/signin",
    loader: () => import("../../view/pages/Auth/Signin"),
  },

  {
    path: "/auth/signup",
    loader: () => import("../../view/pages/Auth/Signup"),
  },
];


const simpleRoutes = [
  {
    path: "/403",
    loader: () => import("../../view/shared/errors/Error403Page"),
  },
  {
    path: "/500",
    loader: () => import("../../view/shared/errors/Error500Page"),
  },
  {
    path: "**",
    loader: () => import("../../view/shared/errors/Error404Page"),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: "/auth/empty-permissions",
    loader: () => import("../../view/pages/Auth/EmptyPermissionsPage"),
  },
].filter(Boolean);



export default {
  privateRoutes,
  publicRoutes,
  simpleRoutes,
  emptyPermissionsRoutes,
};
