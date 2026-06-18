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

      interview_status

      FROM candidates

      WHERE

      status = 'Interview'

      AND interview_date IS NOT NULL

      AND interview_time IS NOT NULL

      ORDER BY interview_date ASC, interview_time ASC

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