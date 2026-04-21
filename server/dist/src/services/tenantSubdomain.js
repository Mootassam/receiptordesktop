"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantSubdomain = void 0;
const config_1 = require("../config");
exports.tenantSubdomain = {
    frontendUrl(tenant) {
        const frontendUrlWithSubdomain = (0, config_1.getConfig)()
            .FRONTEND_URL_WITH_SUBDOMAIN;
        if ((0, config_1.getConfig)().TENANT_MODE !== 'multi-with-subdomain' ||
            !frontendUrlWithSubdomain ||
            !tenant ||
            !tenant.url) {
            return (0, config_1.getConfig)().FRONTEND_URL;
        }
        return frontendUrlWithSubdomain.replace('[subdomain]', tenant.url);
    },
};
//# sourceMappingURL=tenantSubdomain.js.map