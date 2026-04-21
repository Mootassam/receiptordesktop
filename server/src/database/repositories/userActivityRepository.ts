import UserActivity from "../models/userActivity";
import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import { IRepositoryOptions } from "./IRepositoryOptions";

export default class UserActivityRepository {
  static async log(
    {
      user,
      email,
      ipAddress,
      country,
      deviceStatus,
      action = "login",
      tenantId,
    },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const [row] = await UserActivity(options.database).create(
      [
        {
          user,
          email,
          action,
          ipAddress,
          country,
          deviceStatus,
          tenantId: tenantId || currentTenant?.id || null,
          timestamp: new Date(),
        },
      ],
      options
    );

    return row;
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const criteriaAnd: any[] = [];

    if (currentTenant?.id) {
      criteriaAnd.push({ tenantId: currentTenant.id });
    }

    if (filter?.email) {
      criteriaAnd.push({
        email: {
          $regex: MongooseQueryUtils.escapeRegExp(filter.email),
          $options: "i",
        },
      });
    }

    const sort = MongooseQueryUtils.sort(orderBy || "timestamp_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    const rows = await UserActivity(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user");

    const count = await UserActivity(options.database).countDocuments(criteria);
    return { rows, count };
  }
}
