"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    app.get(`/single`, require('./tenantList').default);
};
//# sourceMappingURL=index.js.map