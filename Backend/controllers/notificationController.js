const db = require("../config/db");

exports.getNotifications = async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT *
      FROM notifications
      ORDER BY created_at DESC
      LIMIT 20
    `);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching notifications",
        });
    }
};
exports.markAsRead = async (req, res) => {

    try {
        await db.query(
            "UPDATE notifications SET is_read = 1 WHERE id = ?",
            [req.params.id]
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json(err);
    }
};