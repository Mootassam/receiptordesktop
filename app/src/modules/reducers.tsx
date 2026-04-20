/* eslint-disable react-refresh/only-export-components */
import { connectRouter } from "connected-react-router";
import auth from "../modules/auth/authReducers";

import { combineReducers } from "redux";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

  });
