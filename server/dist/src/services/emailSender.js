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
const assert_1 = __importDefault(require("assert"));
const config_1 = require("../config");
const mail_1 = __importDefault(require("@sendgrid/mail"));
if ((0, config_1.getConfig)().SENDGRID_KEY) {
    mail_1.default.setApiKey((0, config_1.getConfig)().SENDGRID_KEY);
}
class EmailSender {
    constructor(templateId, variables) {
        this.templateId = templateId;
        this.variables = variables;
    }
    static get TEMPLATES() {
        if (!EmailSender.isConfigured) {
            return {};
        }
        return {
            EMAIL_ADDRESS_VERIFICATION: (0, config_1.getConfig)()
                .SENDGRID_TEMPLATE_EMAIL_ADDRESS_VERIFICATION,
            INVITATION: (0, config_1.getConfig)().SENDGRID_TEMPLATE_INVITATION,
            PASSWORD_RESET: (0, config_1.getConfig)()
                .SENDGRID_TEMPLATE_PASSWORD_RESET,
        };
    }
    sendTo(recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!EmailSender.isConfigured) {
                console.error(`Email provider is not configured.`);
                return;
            }
            (0, assert_1.default)(recipient, 'to is required');
            (0, assert_1.default)((0, config_1.getConfig)().SENDGRID_EMAIL_FROM, 'SENDGRID_EMAIL_FROM is required');
            (0, assert_1.default)(this.templateId, 'templateId is required');
            const msg = {
                to: recipient,
                from: (0, config_1.getConfig)().SENDGRID_EMAIL_FROM,
                templateId: this.templateId,
                dynamicTemplateData: this.variables,
            };
            try {
                return yield mail_1.default.send(msg);
            }
            catch (error) {
                console.error('Error sending SendGrid email.');
                console.error(error);
                throw error;
            }
        });
    }
    static get isConfigured() {
        return Boolean((0, config_1.getConfig)().SENDGRID_EMAIL_FROM &&
            (0, config_1.getConfig)().SENDGRID_KEY);
    }
}
exports.default = EmailSender;
//# sourceMappingURL=emailSender.js.map