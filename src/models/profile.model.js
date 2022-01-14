const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    summary: { type: String, required: true },
    profession: { type: String, required: true },
    location: { type: String, required: true },
    projects: [{ type: String, required: true }],
    techStack: [{ type: String, required: true }],
    motive: { type: String, required: true },
    status: { type: Boolean, required: true },
    profilePicUrl: { type: String, required: true },
  },
  {
    timeStamp: true,
    versionKey: false,
  }
);

module.exports = model("profile", profileSchema);
