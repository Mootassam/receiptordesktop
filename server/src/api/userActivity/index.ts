export default (app) => {
  app.get(
    `/tenant/:tenantId/user-activity`,
    require("./userActivityList").default
  );
};
