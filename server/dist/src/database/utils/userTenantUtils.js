"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserInTenant = isUserInTenant;
function isUserInTenant(user, tenantId) {
    if (!user) {
        return false;
    }
    return user.tenants.some((tenantUser) => String(tenantUser.tenant.id) === String(tenantId));
}
//# sourceMappingURL=userTenantUtils.js.map