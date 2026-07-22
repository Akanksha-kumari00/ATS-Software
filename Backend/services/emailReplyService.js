const Imap = require("imap");
const { simpleParser } = require("mailparser");
const db = require("../config/db");

const imap = new Imap({
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
    host: process.env.IMAP_HOST,
    port: process.env.IMAP_PORT,
    tls: true,
});

function listenEmailReplies() {
    imap.once("ready", () => {
        console.log("Mail listener started");
        imap.openBox("INBOX", false, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            imap.on("mail", () => {
                imap.search(["UNSEEN"], (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (!results || results.length === 0) return;
                    const fetch = imap.fetch(results, {
                        bodies: "",
                        markSeen: true
                    });

                    fetch.on("message", (msg) => {
                        msg.on("body", (stream) => {
                            simpleParser(stream)
                                .then(async (mail) => {
                                    try {
                                        const sender = mail.from.value[0].address;
                                        let reply = (mail.text || "").replace(/\r\n/g, "\n");
                                        const patterns = [
                                            /\nOn .*wrote:/i,
                                            /\nFrom:/i,
                                            /\n-----Original Message-----/i,
                                            /\n________________________________/i,
                                        ];

                                        for (const pattern of patterns) {
                                            const index = reply.search(pattern);
                                            if (index !== -1) {
                                                reply = reply.substring(0, index);
                                                break;
                                            }
                                        }

                                        reply = reply.trim();

                                        console.log("Email received from:", sender);

                                        // Candidate search
                                        const [candidate] = await db.query(
                                            "SELECT id,candidate_name,email FROM candidates WHERE email=?",
                                            [sender]
                                        );

                                        // Ignore unknown senders
                                        if (candidate.length === 0) {
                                            console.log("Ignored:", sender);
                                            return;
                                        }
                                        await db.query(
                                            `INSERT INTO notifications
                                            (candidate_id,title,message,type)
                                            VALUES (?,?,?,?)`,
                                            [
                                                candidate[0].id,
                                                "Candidate Replied",
                                                `${candidate[0].candidate_name} replied:\n\n${reply}`,
                                                "candidate_reply"
                                            ]
                                        );
                                        console.log("Reply notification saved");

                                    } catch (error) {
                                        console.log(error);
                                    }
                                });
                        });
                    });
                });
            });
        });
    });

    imap.once("error", (err) => {
        console.log("IMAP Error:", err);
    });

    imap.once("end", () => {
        console.log("IMAP Connection Ended");
    });

    imap.connect();

}

module.exports = listenEmailReplies;