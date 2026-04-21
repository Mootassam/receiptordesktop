"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = __importDefault(require("../../database/repositories/userRepository"));
const Error400_1 = __importDefault(require("../../errors/Error400"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailSender_1 = __importDefault(require("../../services/emailSender"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tenantUserRepository_1 = __importDefault(require("../../database/repositories/tenantUserRepository"));
const mongooseRepository_1 = __importDefault(require("../../database/repositories/mongooseRepository"));
const tenantService_1 = __importDefault(require("../tenantService"));
const tenantRepository_1 = __importDefault(require("../../database/repositories/tenantRepository"));
const tenantSubdomain_1 = require("../tenantSubdomain");
const Error401_1 = __importDefault(require("../../errors/Error401"));
const moment_1 = __importDefault(require("moment"));
const assetsRepository_1 = __importDefault(require("../../database/repositories/assetsRepository"));
const uuid_1 = require("uuid");
const ethers_1 = require("ethers");
const config_1 = require("../../config");
const crypto_1 = __importDefault(require("crypto"));
const nonces = new Map();
const BCRYPT_SALT_ROUNDS = 12;
class AuthService {
    static signupMobile(email_1, password_1, phoneNumber_1, invitationToken_1, tenantId_1) {
        return __awaiter(this, arguments, void 0, function* (email, password, phoneNumber, invitationToken, tenantId, options = {}, req) {
            const session = yield mongooseRepository_1.default.createSession(options.database);
            try {
                email = email.toLowerCase();
                const existingUser = yield userRepository_1.default.findByEmail(email, options);
                // Generates a hashed password to hide the original one.
                const hashedPassword = yield bcrypt_1.default.hash(password, BCRYPT_SALT_ROUNDS);
                const filter = {};
                // const countUser = await UserRepository.CountUser(options);
                // const checkrefCode = await UserRepository.checkRefcode(
                //   invitationcode,
                //   options
                // );
                // if (!checkrefCode) {
                //   throw new Error400(options.language, "auth.invitationCode");
                // }
                // The user may already exist on the database in case it was invided.
                if (existingUser) {
                    // If the user already have an password,
                    // it means that it has already signed up
                    const existingPassword = yield userRepository_1.default.findPassword(existingUser.id, options);
                    if (existingPassword) {
                        throw new Error400_1.default(options.language, "auth.emailAlreadyInUse");
                    }
                    /**
                     * In the case of the user exists on the database (was invited)
                     * it only creates the new password
                     */
                    yield userRepository_1.default.updatePassword(existingUser.id, hashedPassword, false, Object.assign(Object.assign({}, options), { session, bypassPermissionValidation: true }));
                    // Handles onboarding process like
                    // invitation, creation of default tenant,
                    // or default joining the current tenant
                    yield this.handleOnboardMobile(existingUser, invitationToken, tenantId, Object.assign(Object.assign({}, options), { session }));
                    // Email may have been alreadyverified using the invitation token
                    const isEmailVerified = Boolean(yield userRepository_1.default.count({
                        emailVerified: true,
                        _id: existingUser.id,
                    }, Object.assign(Object.assign({}, options), { session })));
                    if (!isEmailVerified && emailSender_1.default.isConfigured) {
                        yield this.sendEmailAddressVerificationEmail(options.language, existingUser.email, tenantId, Object.assign(Object.assign({}, options), { session, bypassPermissionValidation: true }));
                    }
                    const token = jsonwebtoken_1.default.sign({ id: existingUser.id }, (0, config_1.getConfig)().AUTH_JWT_SECRET, { expiresIn: (0, config_1.getConfig)().AUTH_JWT_EXPIRES_IN });
                    yield mongooseRepository_1.default.commitTransaction(session);
                    return token;
                }
                const newUser = yield userRepository_1.default.createFromAuthMobile({
                    firstName: email,
                    password: hashedPassword,
                    email: email,
                    phoneNumber: phoneNumber,
                    req,
                }, Object.assign(Object.assign({}, options), { session }));
                // email
                // Now create assets with completeUser.tenant
                yield assetsRepository_1.default.createDefaultAssets(newUser, tenantId, options);
                // email
                // Handles onboarding process like
                // invitation, creation of default tenant,
                // or default joining the current tenant
                yield this.handleOnboardMobile(newUser, invitationToken, tenantId, Object.assign(Object.assign({}, options), { session }));
                // Email may have been alreadyverified using the invitation token
                const isEmailVerified = Boolean(yield userRepository_1.default.count({
                    emailVerified: true,
                    _id: newUser.id,
                }, Object.assign(Object.assign({}, options), { session })));
                if (!isEmailVerified && emailSender_1.default.isConfigured) {
                    yield this.sendEmailAddressVerificationEmail(options.language, newUser.email, tenantId, Object.assign(Object.assign({}, options), { session }));
                }
                const token = jsonwebtoken_1.default.sign({ id: newUser.id }, (0, config_1.getConfig)().AUTH_JWT_SECRET, {
                    expiresIn: (0, config_1.getConfig)().AUTH_JWT_EXPIRES_IN,
                });
                yield mongooseRepository_1.default.commitTransaction(session);
                return token;
            }
            catch (error) {
                yield mongooseRepository_1.default.abortTransaction(session);
                throw error;
            }
        });
    }
    static addressNonce(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const nonce = (0, uuid_1.v4)();
            nonces.set(address.toLowerCase(), nonce);
            return { nonce };
        });
    }
    static signWithWallet(req, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address, signature, message, invitationToken, tenantId } = req.body;
            // Input validation
            if (!address || !signature || !message) {
                throw new Error400_1.default(options.language, "errors.missingRequiredFields");
            }
            const normalizedAddress = address.toLowerCase();
            const session = yield mongooseRepository_1.default.createSession(options.database);
            try {
                // Validate nonce
                const savedNonce = nonces.get(normalizedAddress);
                if (!savedNonce || !message.includes(savedNonce)) {
                    throw new Error400_1.default(options.language, "errors.invalidNonce");
                }
                // Verify signature
                const recoveredAddress = ethers_1.ethers.verifyMessage(message, signature);
                if (recoveredAddress.toLowerCase() !== normalizedAddress) {
                    throw new Error400_1.default(options.language, "errors.invalidSignature");
                }
                // Nonce must be one-time use
                nonces.delete(normalizedAddress);
                // Find or create user
                let user = yield userRepository_1.default.findUserByEmail(normalizedAddress, req);
                let token;
                if (!user) {
                    // Create new user from wallet
                    user = yield userRepository_1.default.createFromWallet(req, { address: normalizedAddress }, Object.assign(Object.assign({}, options), { session }));
                    yield assetsRepository_1.default.createDefaultAssets(user, tenantId, options);
                    // Handle onboarding if user was created
                    yield this.handleOnboardMobile(user, invitationToken, tenantId, Object.assign(Object.assign({}, options), { session }));
                }
                // Generate JWT token (for both new and existing users)
                token = jsonwebtoken_1.default.sign({
                    id: user.id,
                    address: normalizedAddress
                }, (0, config_1.getConfig)().AUTH_JWT_SECRET, {
                    expiresIn: (0, config_1.getConfig)().AUTH_JWT_EXPIRES_IN,
                });
                yield mongooseRepository_1.default.commitTransaction(session);
                return token;
            }
            catch (error) {
                // Rollback transaction on error
                yield mongooseRepository_1.default.abortTransaction(session);
                // Re-throw the error for higher-level handling
                if (error instanceof Error400_1.default) {
                    throw error;
                }
                // Log unexpected errors
                console.error('Wallet sign error:', error);
                throw new Error400_1.default(options.language, "errors.walletSignFailed");
            }
        });
    }
    static signup(email_1, password_1, username_1, phoneNumber_1, withdrawPassword_1, invitationcode_1, invitationToken_1, tenantId_1, device_1) {
        return __awaiter(this, arguments, void 0, function* (email, password, username, phoneNumber, withdrawPassword, invitationcode, invitationToken, tenantId, device, options = {}, req) {
            const session = yield mongooseRepository_1.default.createSession(options.database);
            try {
                email = email.toLowerCase();
                const existingUser = yield userRepository_1.default.findByEmail(email, options);
                // Generates a hashed password to hide the original one.
                const hashedPassword = yield bcrypt_1.default.hash(password, BCRYPT_SALT_ROUNDS);
                const filter = {};
                // const countUser = await UserRepository.CountUser(options);
                // const checkrefCode = await UserRepository.checkRefcode(
                //   invitationcode,
                //   options
                // );
                // if (!checkrefCode) {
                //   throw new Error400(options.language, "auth.invitationCode");
                // }
                // The user may already exist on the database in case it was invided.
                if (existingUser) {
                    // If the user already have an password,
                    // it means that it has already signed up
                    const existingPassword = yield userRepository_1.default.findPassword(existingUser.id, options);
                    if (existingPassword) {
                        throw new Error400_1.default(options.language, "auth.emailAlreadyInUse");
                    }
                    /**
                     * In the case of the user exists on the database (was invited)
                     * it only creates the new password
                     */
                    yield userRepository_1.default.updatePassword(existingUser.id, hashedPassword, false, Object.assign(Object.assign({}, options), { session, bypassPermissionValidation: true }));
                    // Keep old signup behavior: no blocking by device, only tracking if present.
                    yield this.bindDeviceIfPresent(existingUser === null || existingUser === void 0 ? void 0 : existingUser.id, device, Object.assign(Object.assign({}, options), { session }));
                    // Handles onboarding process like
                    // invitation, creation of default tenant,
                    // or default joining the current tenant
                    yield this.handleOnboard(existingUser, invitationToken, tenantId, Object.assign(Object.assign({}, options), { session }));
                    // Email may have been alreadyverified using the invitation token
                    const isEmailVerified = Boolean(yield userRepository_1.default.count({
                        emailVerified: true,
                        _id: existingUser.id,
                    }, Object.assign(Object.assign({}, options), { session })));
                    if (!isEmailVerified && emailSender_1.default.isConfigured) {
                        yield this.sendEmailAddressVerificationEmail(options.language, existingUser.email, tenantId, Object.assign(Object.assign({}, options), { session, bypassPermissionValidation: true }));
                    }
                    const token = jsonwebtoken_1.default.sign({ id: existingUser.id }, (0, config_1.getConfig)().AUTH_JWT_SECRET, { expiresIn: (0, config_1.getConfig)().AUTH_JWT_EXPIRES_IN });
                    yield mongooseRepository_1.default.commitTransaction(session);
                    return token;
                }
                const newUser = yield userRepository_1.default.createFromAuth({
                    firstName: email.split("@")[0],
                    password: hashedPassword,
                    email: email,
                    username: username,
                    phoneNumber: phoneNumber,
                    withdrawPassword: withdrawPassword,
                    req,
                }, Object.assign(Object.assign({}, options), { session }));
                // Keep old signup behavior: no blocking by device, only tracking if present.
                yield this.bindDeviceIfPresent(newUser === null || newUser === void 0 ? void 0 : newUser.id, device, Object.assign(Object.assign({}, options), { session }));
                // email
                // email
                // Handles onboarding process like
                // invitation, creation of default tenant,
                // or default joining the current tenant
                yield this.handleOnboard(newUser, invitationToken, tenantId, Object.assign(Object.assign({}, options), { session }));
                // Email may have been alreadyverified using the invitation token
                const isEmailVerified = Boolean(yield userRepository_1.default.count({
                    emailVerified: true,
                    _id: newUser.id,
                }, Object.assign(Object.assign({}, options), { session })));
                if (!isEmailVerified && emailSender_1.default.isConfigured) {
                    yield this.sendEmailAddressVerificationEmail(options.language, newUser.email, tenantId, Object.assign(Object.assign({}, options), { session }));
                }
                const token = jsonwebtoken_1.default.sign({ id: newUser.id }, (0, config_1.getConfig)().AUTH_JWT_SECRET, {
                    expiresIn: (0, config_1.getConfig)().AUTH_JWT_EXPIRES_IN,
                });
                yield mongooseRepository_1.default.commitTransaction(session);
                return token;
            }
            catch (error) {
                yield mongooseRepository_1.default.abortTransaction(session);
                throw error;
            }
        });
    }
    static resetPassword(userId, newPassword, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const newHashedPassword = yield bcrypt_1.default.hash(newPassword, BCRYPT_SALT_ROUNDS);
            return userRepository_1.default.updatePassword(userId, newHashedPassword, true, options);
        });
    }
    static findByEmail(email_1) {
        return __awaiter(this, arguments, void 0, function* (email, options = {}) {
            email = email.toLowerCase();
            return userRepository_1.default.findByEmail(email, options);
        });
    }
    static signin(email_1, password_1, invitationToken_1, tenantId_1, device_1) {
        return __awaiter(this, arguments, void 0, function* (email, password, invitationToken, tenantId, device, options = {}, req) {
            const session = yield mongooseRepository_1.default.createSession(options.database);
            try {
                email = email.toLowerCase();
                const user = yield userRepository_1.default.findByEmail(email, options);
                if (!user) {
                    throw new Error400_1.default(options.language, "auth.userNotFound");
                }
                const currentPassword = yield userRepository_1.default.findPassword(user.id, options);
                if (!currentPassword) {
                    throw new Error400_1.default(options.language, "auth.wrongPassword");
                }
                const passwordsMatch = yield bcrypt_1.default.compare(password, currentPassword);
                if (!passwordsMatch) {
                    throw new Error400_1.default(options.language, "auth.wrongPassword");
                }
                // Handles onboarding process like
                // invitation, creation of default tenant,
                // or default joining the current tenant
                yield this.handleOnboard(user, invitationToken, tenantId, Object.assign(Object.assign({}, options), { currentUser: user, session }));
                const token = jsonwebtoken_1.default.sign({ id: user.id }, (0, config_1.getConfig)().AUTH_JWT_SECRET, {
                    expiresIn: (0, config_1.getConfig)().AUTH_JWT_EXPIRES_IN,
                });
                yield userRepository_1.default
                    .SaveIp(user.id, req, options);
                yield this.touchDeviceSeen(user === null || user === void 0 ? void 0 : user.id, device, options);
                yield mongooseRepository_1.default.commitTransaction(session);
                return token;
            }
            catch (error) {
                yield mongooseRepository_1.default.abortTransaction(session);
                throw error;
            }
        });
    }
    static handleOnboardMobile(currentUser, invitationToken, tenantId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (invitationToken) {
                try {
                    yield tenantUserRepository_1.default.acceptInvitation(invitationToken, Object.assign(Object.assign({}, options), { currentUser, bypassPermissionValidation: true }));
                }
                catch (error) {
                    console.error(error);
                    // In case of invitation acceptance error, does not prevent
                    // the user from sign up/in
                }
            }
            const isMultiTenantViaSubdomain = ["multi", "multi-with-subdomain"].includes((0, config_1.getConfig)().TENANT_MODE) &&
                tenantId;
            if (isMultiTenantViaSubdomain) {
                yield new tenantService_1.default(Object.assign(Object.assign({}, options), { currentUser })).joinWithDefaultRolesOrAskApproval({
                    tenantId,
                    // leave empty to require admin's approval
                    roles: [],
                }, options);
            }
            const singleTenant = (0, config_1.getConfig)().TENANT_MODE === "single";
            if (singleTenant) {
                // In case is single tenant, and the user is signing in
                // with an invited email and for some reason doesn't have the token
                // it auto-assigns it
                yield new tenantService_1.default(Object.assign(Object.assign({}, options), { currentUser })).joinDefaultUsingInvitedEmail(options.session);
                // Creates or join default Tenant
                yield new tenantService_1.default(Object.assign(Object.assign({}, options), { currentUser })).createOrJoinDefaultMobile({
                    // leave empty to require admin's approval
                    roles: [],
                }, options.session);
            }
        });
    }
    static handleOnboard(currentUser, invitationToken, tenantId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (invitationToken) {
                try {
                    yield tenantUserRepository_1.default.acceptInvitation(invitationToken, Object.assign(Object.assign({}, options), { currentUser, bypassPermissionValidation: true }));
                }
                catch (error) {
                    console.error(error);
                    // In case of invitation acceptance error, does not prevent
                    // the user from sign up/in
                }
            }
            const isMultiTenantViaSubdomain = ["multi", "multi-with-subdomain"].includes((0, config_1.getConfig)().TENANT_MODE) &&
                tenantId;
            if (isMultiTenantViaSubdomain) {
                yield new tenantService_1.default(Object.assign(Object.assign({}, options), { currentUser })).joinWithDefaultRolesOrAskApproval({
                    tenantId,
                    // leave empty to require admin's approval
                    roles: [],
                }, options);
            }
            const singleTenant = (0, config_1.getConfig)().TENANT_MODE === "single";
            if (singleTenant) {
                // In case is single tenant, and the user is signing in
                // with an invited email and for some reason doesn't have the token
                // it auto-assigns it
                yield new tenantService_1.default(Object.assign(Object.assign({}, options), { currentUser })).joinDefaultUsingInvitedEmail(options.session);
                // Creates or join default Tenant
                yield new tenantService_1.default(Object.assign(Object.assign({}, options), { currentUser })).createOrJoinDefault({
                    // leave empty to require admin's approval
                    roles: [],
                }, options.session);
            }
        });
    }
    static findByToken(token, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(token, (0, config_1.getConfig)().AUTH_JWT_SECRET, (err, decoded) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const id = decoded.id;
                    const jwtTokenIat = decoded.iat;
                    userRepository_1.default.findById(id, Object.assign(Object.assign({}, options), { bypassPermissionValidation: true }))
                        .then((user) => {
                        const isTokenManuallyExpired = user &&
                            user.jwtTokenInvalidBefore &&
                            moment_1.default
                                .unix(jwtTokenIat)
                                .isBefore((0, moment_1.default)(user.jwtTokenInvalidBefore));
                        if (isTokenManuallyExpired) {
                            reject(new Error401_1.default());
                            return;
                        }
                        // If the email sender id not configured,
                        // removes the need for email verification.
                        if (user && !emailSender_1.default.isConfigured) {
                            user.emailVerified = true;
                        }
                        resolve(user);
                    })
                        .catch((error) => reject(error));
                });
            });
        });
    }
    static sendEmailAddressVerificationEmail(language, email, tenantId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!emailSender_1.default.isConfigured) {
                throw new Error400_1.default(language, "email.error");
            }
            let link;
            try {
                let tenant;
                if (tenantId) {
                    tenant = yield tenantRepository_1.default.findById(tenantId, Object.assign({}, options));
                }
                email = email.toLowerCase();
                const token = yield userRepository_1.default.generateEmailVerificationToken(email, options);
                link = `${tenantSubdomain_1.tenantSubdomain.frontendUrl(tenant)}/auth/verify-email?token=${token}`;
            }
            catch (error) {
                console.error(error);
                throw new Error400_1.default(language, "auth.emailAddressVerificationEmail.error");
            }
            return new emailSender_1.default(emailSender_1.default.TEMPLATES.EMAIL_ADDRESS_VERIFICATION, {
                link,
            }).sendTo(email);
        });
    }
    static sendPasswordResetEmail(language, email, tenantId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield userRepository_1.default.findByEmail(email, options);
            const currentPassword = yield userRepository_1.default.findPassword(user.id, options);
            let link;
            try {
                let tenant;
                if (tenantId) {
                    tenant = yield tenantRepository_1.default.findById(tenantId, Object.assign({}, options));
                }
                email = email.toLowerCase();
                const token = yield userRepository_1.default.generatePasswordResetToken(email, options);
            }
            catch (error) {
                console.error(error);
                throw new Error400_1.default(language, "auth.passwordReset.error");
            }
        });
    }
    static sendPasswordResetEmailOriginal(language, email, tenantId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!emailSender_1.default.isConfigured) {
                throw new Error400_1.default(language, "email.error");
            }
            let link;
            try {
                let tenant;
                if (tenantId) {
                    tenant = yield tenantRepository_1.default.findById(tenantId, Object.assign({}, options));
                }
                email = email.toLowerCase();
                const token = yield userRepository_1.default.generatePasswordResetToken(email, options);
                link = `${tenantSubdomain_1.tenantSubdomain.frontendUrl(tenant)}/auth/password-reset?token=${token}`;
            }
            catch (error) {
                console.error(error);
                throw new Error400_1.default(language, "auth.passwordReset.error");
            }
            return new emailSender_1.default(emailSender_1.default.TEMPLATES.PASSWORD_RESET, {
                link,
            }).sendTo(email);
        });
    }
    static verifyEmail(token, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = options.currentUser;
            const user = yield userRepository_1.default.findByEmailVerificationToken(token, options);
            if (!user) {
                throw new Error400_1.default(options.language, "auth.emailAddressVerificationEmail.invalidToken");
            }
            if (currentUser && currentUser.id && currentUser.id !== user.id) {
                throw new Error400_1.default(options.language, "auth.emailAddressVerificationEmail.signedInAsWrongUser", user.email, currentUser.email);
            }
            return userRepository_1.default.markEmailVerified(user.id, options);
        });
    }
    static passwordReset(token_1, password_1) {
        return __awaiter(this, arguments, void 0, function* (token, password, options = {}) {
            const user = yield userRepository_1.default.findByPasswordResetToken(token, options);
            if (!user) {
                throw new Error400_1.default(options.language, "auth.passwordReset.invalidToken");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, BCRYPT_SALT_ROUNDS);
            return userRepository_1.default.updatePassword(user.id, hashedPassword, true, Object.assign(Object.assign({}, options), { bypassPermissionValidation: true }));
        });
    }
    static changePassword(oldPassword, newPassword, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = options.currentUser;
            const currentPassword = yield userRepository_1.default.findPassword(options.currentUser.id, options);
            const passwordsMatch = yield bcrypt_1.default.compare(oldPassword, currentPassword);
            if (!passwordsMatch) {
                throw new Error400_1.default(options.language, "auth.passwordChange.invalidPassword");
            }
            const newHashedPassword = yield bcrypt_1.default.hash(newPassword, BCRYPT_SALT_ROUNDS);
            return userRepository_1.default.updatePassword(currentUser.id, newHashedPassword, true, options);
        });
    }
    static signinFromSocial(provider_1, providerId_1, email_1, emailVerified_1, firstName_1, lastName_1) {
        return __awaiter(this, arguments, void 0, function* (provider, providerId, email, emailVerified, firstName, lastName, options = {}) {
            if (!email) {
                throw new Error("auth-no-email");
            }
            const session = yield mongooseRepository_1.default.createSession(options.database);
            try {
                email = email.toLowerCase();
                let user = yield userRepository_1.default.findByEmail(email, options);
                if (user &&
                    (user.provider !== provider || user.providerId !== providerId)) {
                    throw new Error("auth-invalid-provider");
                }
                if (!user) {
                    user = yield userRepository_1.default.createFromSocial(provider, providerId, email, emailVerified, firstName, lastName, options);
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id }, (0, config_1.getConfig)().AUTH_JWT_SECRET, {
                    expiresIn: (0, config_1.getConfig)().AUTH_JWT_EXPIRES_IN,
                });
                yield mongooseRepository_1.default.commitTransaction(session);
                return token;
            }
            catch (error) {
                yield mongooseRepository_1.default.abortTransaction(session);
                throw error;
            }
        });
    }
    static hashDeviceValue(value) {
        if (!value)
            return null;
        return crypto_1.default
            .createHash("sha256")
            .update(`${value}:${(0, config_1.getConfig)().AUTH_JWT_SECRET}`)
            .digest("hex");
    }
    static assertDevicePayload(device, options) {
        if (!(device === null || device === void 0 ? void 0 : device.machineId) || !(device === null || device === void 0 ? void 0 : device.fingerprint)) {
            throw new Error400_1.default(options.language, "auth.deviceInfoRequired");
        }
    }
    static bindDeviceOrFail(userId, device, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !(device === null || device === void 0 ? void 0 : device.machineId) || !(device === null || device === void 0 ? void 0 : device.fingerprint)) {
                throw new Error400_1.default(options.language, "auth.deviceInfoRequired");
            }
            const machineIdHash = this.hashDeviceValue(device.machineId);
            const existing = yield userRepository_1.default.findByMachineIdHash(machineIdHash, options);
            if (existing && String(existing.id) !== String(userId)) {
                throw new Error400_1.default(options.language, "auth.deviceAlreadyRegistered");
            }
            yield this.bindDeviceIfPresent(userId, device, options);
        });
    }
    static bindDeviceIfPresent(userId, device, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            if (!userId || !(device === null || device === void 0 ? void 0 : device.machineId))
                return;
            const machineIdHash = this.hashDeviceValue(device.machineId);
            const fingerprintHash = this.hashDeviceValue(device.fingerprint);
            const update = {
                "deviceBinding.machineIdHash": machineIdHash,
                "deviceBinding.fingerprintHash": fingerprintHash,
                "deviceBinding.firstBoundAt": new Date(),
                "deviceBinding.lastSeenAt": new Date(),
            };
            const info = device === null || device === void 0 ? void 0 : device.deviceInfo;
            if (info) {
                update["deviceBinding.cpu"] = info.cpu || null;
                update["deviceBinding.ramGB"] = info.ramGB || null;
                update["deviceBinding.osPlatform"] = ((_a = info.os) === null || _a === void 0 ? void 0 : _a.platform) || null;
                update["deviceBinding.osRelease"] = ((_b = info.os) === null || _b === void 0 ? void 0 : _b.release) || null;
                update["deviceBinding.winVersion"] = ((_c = info.os) === null || _c === void 0 ? void 0 : _c.winVersion) || null;
                update["deviceBinding.manufacturer"] = info.manufacturer || null;
                update["deviceBinding.model"] = info.model || null;
            }
            yield userRepository_1.default.updateDeviceBinding(userId, update, options);
        });
    }
    static touchDeviceSeen(userId, device, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !(device === null || device === void 0 ? void 0 : device.machineId))
                return;
            yield userRepository_1.default.updateDeviceBinding(userId, {
                "deviceBinding.lastSeenAt": new Date(),
            }, options);
        });
    }
    static assertDeviceAllowed(user, device, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const boundHash = (_a = user === null || user === void 0 ? void 0 : user.deviceBinding) === null || _a === void 0 ? void 0 : _a.machineIdHash;
            // Strict mode: login requires already bound device on account.
            if (!boundHash) {
                throw new Error400_1.default(options.language, "auth.deviceNotEnrolled");
            }
            const incomingHash = this.hashDeviceValue(device.machineId);
            if (incomingHash && boundHash && incomingHash !== boundHash) {
                throw new Error400_1.default(options.language, "auth.deviceNotAuthorized");
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=authService.js.map