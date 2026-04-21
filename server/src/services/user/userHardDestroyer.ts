import MongooseRepository from "../../database/repositories/mongooseRepository";
import UserRepository from "../../database/repositories/userRepository";
import AuditLog from "../../database/models/auditLog";
import Records from "../../database/models/records";
import Stacking from "../../database/models/stacking";
import Kyc from "../../database/models/kyc";
import Transaction from "../../database/models/transaction";
import Wallet from "../../database/models/wallet";
import Transfer from "../../database/models/Transfer";
import assert from "assert";
import Error400 from "../../errors/Error400";
import Plans from "../../security/plans";
import { IServiceOptions } from "../IServiceOptions";

export default class UserHardDestroyer {
  options: IServiceOptions;
  session;
  data;

  constructor(options) {
    this.options = options;
  }

  async destroyAll(data) {
    this.data = data;
    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(this.options.database);

      await Promise.all(this._ids.map((id) => this._destroy(id)));

      return MongooseRepository.commitTransaction(this.session);
    } catch (error) {
      await MongooseRepository.abortTransaction(this.session);
      throw error;
    }
  }

  get _ids() {
    let ids;
    if (this.data.ids && !Array.isArray(this.data.ids)) {
      ids = [this.data.ids];
    } else {
      ids = [...new Set(this.data.ids)];
    }

    return ids.map((id) => id.trim());
  }

  async _destroy(id) {
    await this._cleanupUserRelations(id);

    await UserRepository.Destroy(id, {
      ...this.options,
      session: this.session,
      bypassPermissionValidation: true,
    });
  }

  async _cleanupUserRelations(id) {
    const options = {
      ...this.options,
      session: this.session,
    };

    await Promise.all([
      AuditLog(this.options.database).deleteMany({ user: id }, options),
      Records(this.options.database).deleteMany({ user: id }, options),
      Stacking(this.options.database).deleteMany({ user: id }, options),
      Kyc(this.options.database).deleteMany({ user: id }, options),
      Transaction(this.options.database).deleteMany({ user: id }, options),
      Wallet(this.options.database).deleteMany({ user: id }, options),
      Transfer(this.options.database).deleteMany({ user: id }, options),
    ]);
  }

  async _isRemovingPlanUser() {
    const currentTenant = this.options.currentTenant;

    if (currentTenant.plan === Plans.values.free) {
      return false;
    }

    if (!currentTenant.planUserId) {
      return false;
    }

    return this._ids.includes(String(currentTenant.planUserId));
  }

  _isRemovingHimself() {
    return this._ids.includes(String(this.options.currentUser.id));
  }

  async _validate() {
    assert(this.options.currentTenant.id, "tenantId is required");
    assert(this.options.currentUser, "currentUser is required");
    assert(this.options.currentUser.id, "currentUser.id is required");
    assert(this.options.currentUser.email, "currentUser.email is required");
    assert(this._ids && this._ids.length, "ids is required");

    if (await this._isRemovingPlanUser()) {
      throw new Error400(this.options.language, "user.errors.destroyingPlanUser");
    }

    if (this._isRemovingHimself()) {
      throw new Error400(this.options.language, "user.errors.destroyingHimself");
    }
  }
}
