const express = require('express');
const session = require('express-session');
const cors = require('cors');
const Database = require('./Database');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');

const db = new Database();

const app = express();
const port = 3000;
// Cross origin resource sharing. Important so that client will be able to make calls to APIs on a different domain.
app.use(cors());
app.use(bodyParser.json());
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false)
// or the qs library (when true). 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'SessionKey&2003',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3000000, // مدة الجلسة
        rolling: true     // تجديد الجلسة مع كل طلب جديد
    }
    ,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/MiddleEast' })
}));

app.post("/User", (req, res) => {
    const body = req.body;
    console.log("BODY :", body);
    db.addUser(body).then((data) => {
        req.session.isLoggedIn = true;
        req.session.userName = body["UserName"];
        req.session.Email = body["Email"];
        console.log("this is the session :" + req.session.userName)
        res.send({ success: true, tokens: req.session });
    })
        .catch(err => {
            res.status(500).send(err);
        })
});
app.post("/User/:Email", (req, res) => {
    const body = req.body;

    db.checkPass(body).then((data) => {
        req.session.userName = data.UserName;
        req.session.email = data.Email;
        res.send({ success: true, tokens: req.session });
    })
        .catch(err => {
            res.status(500).send(err);
        })
});
app.post("/check-user", (req, res) => {
    console.log("Request received at /check-user:", req.body);

    const { Email } = req.body;
    if (!Email) {
        console.log("Missing email in request body");
        res.status(400).send({ error: "Missing email in request body" });
        return;
    }

    db.checkEmailOnly({ Email })
        .then((data) => {
            console.log("Database response:", data);

            // Check if the response is an object and count its keys
            const dataLength = data ? Object.keys(data).length : 0;

            console.log("Data length:", dataLength);

            // Respond with whether data exists
            res.send({ exists: dataLength > 0 });
        })
        .catch((err) => {
            console.error("Error in db.checkEmailOnly:", err);
            res.status(500).send({ error: "Internal Server Error" });
        });


});


app.post("/send-verification", (req, res) => {
    const { UserName, Email, VerificationCode } = req.body;

    if (Email && VerificationCode) {
        db.sendEmail({ UserName, Email, VerificationCode })
            .then((data) => {
                res.send({ success: true });
            })
            .catch((err) => {
                console.error("Error sending email:", err);
                res.status(500).send({ error: "Server error" });
            });
    } else {
        res.status(400).send({ error: "Missing email or verification code" });
    }
});

app.get('/userSession', (req, res) => {
    console.log("this is the check session : " + req.session.userName);
    if (req.session.isLoggedIn) {
        res.json({ isLoggedIn: true, username: req.session.userName, email: req.session.Email });
    } else {
        res.json({ isLoggedIn: false });
    }
});

app.get("/User/:Email", (req, res) => {
    const Email = req.params.Email;

    if (Email) {
        db.checkAndGetData(Email)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            })

    }

});

// app.get("/User/:Email", (req, res) => {
//     const email = req.params.Email;
//     db.getEmail(email)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send("email not found");
//             } else {
//                 res.send(data);
//             }
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         })

// });
// app.get("/notes/:title", (req, res) => {
//     const { title } = req.params;
//     db.getNoteByTitle(title)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send("Note not found");
//             } else {
//                 res.send(data);
//             }
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         })

// });
app.put("/User", (req, res) => {

    db.updateUser(req.body)
        .then(data => {
            if (!data) {
                res.status(404).send("Note not found");
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        })

});
// app.delete("/notes/:id", (req, res) => {
//     const id = req.params.id;
//     db.deleteNote(id)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send("Note not found");
//             } else {
//                 res.send(data);
//             }
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         })

// });


// const nodeMailer = require("nodemailer");
// const Transporter = nodeMailer.createTransport({
//   port: 587, // Correct property name
//   host: "smtp.gmail.com",
//   secure: false, 
//   auth :{
//     user : "waelalmallah7@gmail.com",
//     pass : 'sgkk nxmf vbcr iuvj',
//   },
//   tls: {
//     rejectUnauthorized: false
//   },
//   connectionTimeout : 5000,
//   greetingTimeout : 3000
// });

// var message = {
//   from: "waelalmallah7@gmail.com", // Correct property name
//   to: "waelalmallah003@gmail.com",
//   subject: "Hello from Node.js",
//   text: "Hello from Node.js ",
// };

// Transporter.sendMail(message, (error, info) => {
//   if (error) {
//     console.log(error + " error happened");
//   } else {
//     console.log("Email sent: " + info.response); // Log the response from the email server
//   }
// });

app.listen(port, () => {
    console.log(`Started node server and listening to port ${port}`);
    db.connect();
});

