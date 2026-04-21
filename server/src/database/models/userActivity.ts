import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("userActivity");
  } catch (error) {
    // continue
  }

  const UserActivitySchema = new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: "user", required: true },
      email: { type: String, maxlength: 255 },
      action: { type: String, maxlength: 64, default: "login" },
      ipAddress: { type: String, maxlength: 128 },
      country: { type: String, maxlength: 128 },
      tenantId: { type: Schema.Types.ObjectId, ref: "tenant" },
      deviceStatus: { type: String, maxlength: 64 },
      timestamp: { type: Date, default: Date.now },
    },
    {
      timestamps: true,
    }
  );

  UserActivitySchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  UserActivitySchema.set("toJSON", { getters: true });
  UserActivitySchema.set("toObject", { getters: true });

  return database.model("userActivity", UserActivitySchema);
};
