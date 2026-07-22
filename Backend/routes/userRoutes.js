
const verifyToken = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
    register,
    login,
    forgotPassword,
    updateProfile,
    changePassword,
    getProfile,
    resetPassword,
} = require("../controllers/userController");

const uploadProfile = require("../middleware/uploadProfile");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put(
    "/profile",
    verifyToken,
    uploadProfile.single("profile_image"),
    updateProfile
);


router.get("/profile", verifyToken, getProfile);
router.post("/reset-password", resetPassword);
module.exports = router;