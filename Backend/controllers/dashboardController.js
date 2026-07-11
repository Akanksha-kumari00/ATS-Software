const db = require("../config/db");
exports.getRecruitmentPipeline = async (req, res) => {
  try {
    const period = req.query.period || "thisMonth";
    let condition = "";
    if (period === "today") {
      condition = `DATE(created_at)=CURDATE()`;
    }
    else if (period === "thisWeek") {
      condition = `YEARWEEK(created_at)=YEARWEEK(CURDATE())`;
    }
    else if (period === "previousMonth") {
      condition = `
      MONTH(created_at)=MONTH(CURDATE()-INTERVAL 1 MONTH)
      AND
      YEAR(created_at)=YEAR(CURDATE()-INTERVAL 1 MONTH)
      `;
    }
    else {
      condition = `
      MONTH(created_at)=MONTH(CURDATE())
      AND
      YEAR(created_at)=YEAR(CURDATE())
      `;
    }
    const [rows] = await db.query(`
      SELECT
      status,
      COUNT(*) total
      FROM candidates
      WHERE ${condition}
      GROUP BY status
    `);
    const stages = [
      {
        key: "New",
        label: "New"
      },
      {
        key: "CV Shared",
        label: "CV Forward"
      },
      {
        key: "Shortlisted",
        label: "Shortlisted"
      },
      {
        key: "Interview",
        label: "Interview"
      },
      {
        key: "Selected",
        label: "Hired"
      },
      {
        key: "Rejected",
        label: "Rejected"
      }
    ];
    let grandTotal = 0;
    rows.forEach(item => {
      grandTotal += Number(item.total);
    });
    const pipeline = stages.map(stage => {
      const found = rows.find(
        row => row.status === stage.key
      );
      const count = found
        ? Number(found.total)
        : 0;
      return {
        title: stage.label,
        count,
        percentage: grandTotal
          ? Number(
              ((count / grandTotal) * 100)
              .toFixed(1)
            )
          : 0
      };
    });
    res.json(pipeline);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};
// Dashboard Summary Cards
exports.getHiringSummary = async (req, res) => {
  try {

    const [[hospital]] = await db.query(`
    SELECT COUNT(*) AS totalHospitals
    FROM clients_hospitals
    WHERE status = 'Active'
   `);

    const [[position]] = await db.query(`
      SELECT COUNT(*) AS totalPositions
      FROM job_positions
    `);

    const [[hiring]] = await db.query(`
      SELECT COUNT(*) AS totalHiring
      FROM candidates
      WHERE status='Selected'
    `);

    res.json({
      totalHospitals: hospital.totalHospitals,
      totalPositions: position.totalPositions,
      totalHiring: hiring.totalHiring,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
      sql: err.sqlMessage,
    });
  }
};
exports.getRecentApplications = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
      id,
      candidate_name,
      education,
      hospital_name,
      status,
      DATE(created_at) AS applied_date
      FROM candidates
      ORDER BY created_at DESC
      LIMIT 5
    `);
    res.json(rows);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};
exports.getUpcomingInterviews = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
      id,
      DATE(interview_date) AS interview_date,
      candidate_name,
      TIME_FORMAT(
        interview_time,
        '%h:%i %p'
      ) AS interview_time
      FROM candidates
      WHERE
      status='Interview'
      AND interview_date IS NOT NULL
      ORDER BY interview_date ASC
      LIMIT 5
    `);
    res.json(rows);
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server Error"
    });
  }
};