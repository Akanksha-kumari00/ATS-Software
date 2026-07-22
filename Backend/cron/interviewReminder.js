
const cron = require("node-cron");
const dayjs = require("dayjs");
const transporter = require("../config/mailer");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const db = require("../config/db");
cron.schedule("* * * * *", async () => {


    const [candidates] = await db.query(`
        SELECT *
        FROM candidates
        WHERE interview_date >= CURDATE()
        AND interview_date IS NOT NULL
        AND interview_time IS NOT NULL
        `);

    const now = dayjs();

    for (const candidate of candidates) {


        const interviewDate = dayjs(candidate.interview_date).format("YYYY-MM-DD");

        const interview = dayjs(
            `${interviewDate} ${candidate.interview_time}`,
            "YYYY-MM-DD HH:mm:ss"
        );

        // Morning Reminder (8:00 AM)
        const morning = interview.hour(8).minute(0).second(0);

        if (now.format("YYYY-MM-DD HH:mm") === morning.format("YYYY-MM-DD HH:mm")) {

            const [exists] = await db.query(
                `SELECT * FROM notifications
         WHERE candidate_id=? AND type='morning'`,
                [candidate.id]
            );

            if (exists.length === 0) {

                // Send Email
                await transporter.sendMail({
                    from: `"DCS Healthcare Services" <${process.env.SMTP_USER}>`,
                    to: candidate.email,
                    subject: "Interview Reminder",
                    text: `Hello ${candidate.candidate_name},
                    Today you have an interview.
                    Interview Time: ${candidate.interview_time}
                    Thank you.`,
                });
                await db.query(
                    `INSERT INTO notifications
                     (candidate_id,title,message,type)
                    VALUES (?,?,?,?)`,
                    [
                        candidate.id,
                        "Email Notification",
                        `Interview reminder email sent to ${candidate.candidate_name}`,
                        "email",
                    ]
                );
                console.log("Email notification created");
            }
        }

        // 30 Minutes Reminder
        const before30 = interview.subtract(30, "minute");

        if (now.format("YYYY-MM-DD HH:mm") === before30.format("YYYY-MM-DD HH:mm")) {

            const [exists] = await db.query(
                `SELECT id
         FROM notifications
         WHERE candidate_id = ?
         AND type = ?`,
                [candidate.id, "before_30_min"]
            );

            if (exists.length === 0) {

                await db.query(
                    `INSERT INTO notifications
            (candidate_id,title,message,type)
            VALUES (?,?,?,?)`,
                    [
                        candidate.id,
                        "Interview Reminder",
                        `${candidate.candidate_name}'s interview starts in 30 minutes.`,
                        "before_30_min",
                    ]
                );

                console.log("30 minute reminder inserted");
                await transporter.sendMail({
                    from: `"DCS Healthcare Services" <${process.env.SMTP_USER}>`,
                    to: candidate.email,
                    subject: "Interview Starting in 30 Minutes",
                    text: `Hello ${candidate.candidate_name},

Your interview starts in 30 minutes.

Time: ${candidate.interview_time}`,
                });


                await db.query(
                    `INSERT INTO notifications
    (candidate_id,title,message,type)
    VALUES (?,?,?,?)`,
                    [
                        candidate.id,
                        "Email Notification",
                        "30 minute interview reminder email sent",
                        "email",
                    ]
                );
            }
        }

    }

});
cron.schedule("0 1 * * *", async () => {
    try {
        await db.query(`
            DELETE FROM notifications
            WHERE is_read = 1
            AND created_at < DATE_SUB(NOW(), INTERVAL 15 DAY)
        `);

        console.log("Old read notifications deleted");
    } catch (err) {
        console.log("Delete notification error:", err);
    }
});