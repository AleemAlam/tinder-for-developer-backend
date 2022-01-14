const ProfileModel = require("../models/profile.model");
const express = require("express");
const router = express.Router();

const upload = require("./../utils/file-upload");
const protect = require("../middleware/protect");
router.get("/", protect, async (req, res) => {
  try {
    const userProfile = await ProfileModel.find({ user: req.user })
      .lean()
      .exec();
    res.status(200).json({ status: "true", userProfile });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});
router.post("/", protect, upload.single("profilePic"), async (req, res) => {
  try {
    const userProfile = await ProfileModel.create({
      user: req.user._id,
      ...req.body,
      profilePicUrl: req.file.path,
    });

    res.status(200).json({ status: "true", userProfile });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});

router.patch(
  "/:profileId",
  protect,
  upload.single("profilePic"),
  async (req, res) => {
    const { profileId } = req.params;
    const oldProfile = await ProfileModel.findById(profileId);
    try {
      const userProfile = await ProfileModel.findByIdAndUpdate(profileId, {
        name: req.body.name || oldProfile.name,
        summary: req.body.summary || oldProfile.summary,
        profession: req.body.profession || oldProfile.profession,
        location: req.body.location || oldProfile.location,
        projects: req.body.projects || oldProfile.projects,
        techStack: req.body.techStack || oldProfile.techStack,
        motive: req.body.motive || oldProfile.motive,
        status: req.body.status || oldProfile.status,
        profilePicUrl: (req.file && req.file.path) || oldProfile.profilePicUrl,
      });

      res.status(200).json({ status: "true", userProfile });
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  }
);

module.exports = router;
