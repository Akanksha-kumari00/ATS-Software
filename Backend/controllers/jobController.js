const db = require("../config/db");
// Get Job Stats
exports.getJobStats = async (req, res) => {
  try {
    const [[stats]] = await db.query(`
      SELECT
        COUNT(*) AS totalPositions,
        SUM(CASE WHEN status='Open' THEN 1 ELSE 0 END) AS openPositions,
        SUM(CASE WHEN status='On Hold' THEN 1 ELSE 0 END) AS onHoldPositions,
        SUM(CASE WHEN status='Closed' THEN 1 ELSE 0 END) AS closedPositions
      FROM job_positions
    `);
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
exports.getJobs = async (req, res) => {
  const { search, fromDate, toDate } = req.query;
  let sql = `
  SELECT
      jp.*,
      h.hospital_name,
      h.city,
      h.state,
      h.beds,
      u.name recruiter_name
        FROM job_positions jp
        LEFT JOIN clients_hospitals h
            ON jp.hospital_id=h.id
        LEFT JOIN users u
            ON jp.recruiter_id=u.id
        WHERE 1=1
        `;
      const params = [];
      if (search) {
      sql += `
      AND (
        jp.position_title LIKE ?
        OR jp.specialization LIKE ?
        OR h.hospital_name LIKE ?
      )
      `;
     params.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
     );
    }
      if (fromDate) {
        sql += " AND jp.opening_date >= ?";
        params.push(fromDate);
      }
      if (toDate) {
        sql += " AND jp.opening_date <= ?";
        params.push(toDate);
      }
      sql += " ORDER BY jp.id DESC";
      const [rows] = await db.query(sql, params);
      res.json(rows);
};