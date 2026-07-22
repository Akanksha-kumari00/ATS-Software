const transporter = require("../config/mailer");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const path = require("path");

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const [users] = await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (users.length > 0) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hash = await bcrypt.hash(password, 10);

        // Create user
        const [userResult] = await db.query(
            "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
            [name, email, hash, role]
        );

        const userId = userResult.insertId;


        // Automatically create employee
        await db.query(
            `INSERT INTO employees
            (user_id, name, email)
            VALUES (?, ?, ?)`,
            [userId, name, email]
        );


        return res.json({
            message: "User Registered & Employee Created",
        });

    } catch (err) {
        console.error("REGISTER ERROR:", err);
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const [users] = await db.query(
            "SELECT * FROM users WHERE email=? AND role=?",
            [email, role]
        );

        if (users.length === 0) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.json({
            message: "Login Success",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile_image: user.profile_image,
            },
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: err.message,
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const [users] = await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "Email not found",
            });
        }
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();
        const expiry = new Date(
            Date.now() + 10 * 60 * 1000
        );

        await db.query(
            "UPDATE users SET otp=?, otp_expiry=? WHERE email=?",
            [otp, expiry, email]
        );
        await transporter.sendMail({
            from: `"DCS Healthcare Services" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Password Reset OTP",
            html: `
        <div style="font-family:Arial,sans-serif">
            <h2>DCS Healthcare ATS</h2>

            <p>Your OTP for password reset is:</p>

            <h1 style="letter-spacing:5px;color:#13578f;">
                ${otp}
            </h1>

            <p>
                This OTP will expire in
                <b>10 minutes</b>.
            </p>

            <p>
                If you didn't request this,
                please ignore this email.
            </p>
        </div>
    `,
        });
        res.json({
            message: "OTP sent to your email",
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message,
        });

    }
};
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            name,
            currentPassword,
            newPassword
        } = req.body;
        const [users] = await db.query(
            "SELECT * FROM users WHERE id=?",
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const user = users[0];
        let profileImage = user.profile_image;

        if (req.file) {
            profileImage = req.file.filename;
        }
        let password = user.password;
        if (currentPassword && newPassword) {

            const match = await bcrypt.compare(
                currentPassword,
                user.password
            );

            if (!match) {
                return res.status(400).json({
                    message: "Current Password is incorrect",
                });
            }

            password = await bcrypt.hash(newPassword, 10);
        }

        // Update User
        await db.query(
            `UPDATE users
             SET name=?, profile_image=?, password=?
             WHERE id=?`,
            [
                name,
                profileImage,
                password,
                userId
            ]
        );

        const [updatedUser] = await db.query(
            `SELECT id,name,email,role,profile_image
             FROM users
             WHERE id=?`,
            [userId]
        );

        res.json({
            message: "Profile Updated Successfully",
            user: updatedUser[0],
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message,
        });
    }
};
exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            currentPassword,
            newPassword,
        } = req.body;

        const [users] = await db.query(
            "SELECT * FROM users WHERE id=?",
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const user = users[0];

        const match = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!match) {
            return res.status(400).json({
                message: "Current Password Incorrect",
            });
        }

        const hash = await bcrypt.hash(newPassword, 10);

        await db.query(
            "UPDATE users SET password=? WHERE id=?",
            [hash, userId]
        );

        res.json({
            message: "Password Changed Successfully",
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
exports.getProfile = async (req, res) => {
    try {
        const [users] = await db.query(
            "SELECT id,name,email,role,profile_image FROM users WHERE id=?",
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json(users[0]);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const [users] = await db.query(
            "SELECT * FROM users WHERE email=? AND otp=?",
            [email, otp]
        );

        if (users.length === 0) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        const user = users[0];

        if (new Date(user.otp_expiry) < new Date()) {
            return res.status(400).json({
                message: "OTP Expired",
            });
        }

        const hash = await bcrypt.hash(newPassword, 10);

        await db.query(
            "UPDATE users SET password=?, otp=NULL, otp_expiry=NULL WHERE email=?",
            [hash, email]
        );

        res.json({
            message: "Password Reset Successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};