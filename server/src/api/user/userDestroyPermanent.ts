import UserHardDestroyer from "../../services/user/userHardDestroyer";
import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";

export default async (req, res) => {
  try {
    new PermissionChecker(req).validateHas(Permissions.values.userDestroy);

    const remover = new UserHardDestroyer(req);
    await remover.destroyAll(req.query);

    await ApiResponseHandler.success(req, res, true);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
