const db = require("../config/db");

// GET ALL SCHEDULED INTERVIEWS
exports.getInterviews = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        candidate_name,
        specialization,
        email,
        mobile,
        hospital_name,
        hospital_location,
        interview_date,
        interview_time,
        interview_status,
        status
      FROM candidates
      WHERE interview_date IS NOT NULL
      ORDER BY
        CASE
              WHEN interview_status = 'Upcoming' THEN 1
              WHEN interview_status = 'Pending' THEN 2
              WHEN interview_status = 'Confirmed' THEN 3
              WHEN interview_status = 'Completed' THEN 4
              WHEN interview_status = 'Cancelled' THEN 5
              ELSE 6
        END,
        interview_date ASC,
        interview_time ASC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
// GET INTERVIEW STATS
exports.getInterviewStats = async (req, res) => {
  try {
    const [[stats]] = await db.query(`
      SELECT
        SUM(interview_date = CURDATE()) AS today,
        SUM(
          interview_status = 'Upcoming'
          AND interview_date > CURDATE()
        ) AS upcoming,
        SUM(interview_status = 'Completed') AS completed,
        SUM(interview_status = 'Cancelled') AS cancelled
      FROM candidates
      WHERE interview_date IS NOT NULL
    `);

    res.status(200).json({
      today: Number(stats.today) || 0,
      upcoming: Number(stats.upcoming) || 0,
      completed: Number(stats.completed) || 0,
      cancelled: Number(stats.cancelled) || 0,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// GET CANDIDATES FOR SCHEDULE INTERVIEW
exports.getShortlistedCandidates = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        recruiter_name,
        candidate_name,
        education,
        specialization,
        mobile,
        email,
        hospital_name,
        hospital_location,
        cv_forward_date,
        salary_expectation,
        status,
        interview_status,
        interview_date,
        interview_time,
        experience,
        remarks
      FROM candidates
      WHERE
          status='Shortlisted'
       OR interview_status='Pending'
       OR interview_status='Upcoming'
      ORDER BY candidate_name ASC
    `);

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
// SCHEDULE INTERVIEW
exports.scheduleInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      interview_date,
      interview_time
    } = req.body;
    await db.query(
      `
         UPDATE candidates
         SET
         status='Interview',
          interview_status='Upcoming',
          interview_date=?,
          interview_time=?
          WHERE id=?
      `,
      [
        interview_date,
        interview_time,
        id
      ]
    );
    res.status(200).json({
      message: "Interview scheduled successfully"
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};
exports.updateInterviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { interview_status } = req.body;
    await db.query(
      `
      UPDATE candidates
      SET interview_status = ?
      WHERE id = ?
      `,
      [
        interview_status,
        id
      ]
    );
    res.json({
      message: "Interview Updated Successfully"
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      message:error.message
    });
  }
};