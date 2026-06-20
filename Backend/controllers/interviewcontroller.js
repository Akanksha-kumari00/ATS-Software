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
          WHERE
          interview_date >= CURDATE()
          OR interview_status='Pending'
          ORDER BY interview_date ASC
    `);
    res.status(200).json(rows);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
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