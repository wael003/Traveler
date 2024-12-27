const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Transporter = require("./sendEmail");
// const nodeMailer = require("nodemailer");

const User = require("./Sheme/UserSheme");

class Database {
    constructor() {
        this.URL = "mongodb://localhost:27017/MiddleEast";
    }
    connect() {
        mongoose.connect(this.URL)
            .then(() => {
                console.log('Database connection successful');
            }).catch((err) => {
                console.error('Database connection error:', err);
            });

    }
    addUser(user) {
        return new Promise((resolve, reject) => {
            user["VerificationCode"] = 0;

            const query = { Email: user["Email"] };

            User.findOne(query)
                .then(data => {
                    if (data) {
                        reject(new Error("this email is already exist"))
                    } else {
                        const hash = bcrypt.hashSync(user["Password"], 10);
                        user["Password"] = hash;

                        let newUser = User(user);

                        newUser.save().then((doc => {
                            resolve(doc);
                        }))
                            .catch(err => {
                                reject(err);
                            })
                    }
                }).catch(err => {
                    reject(err);
                })




        })
    }
    checkAndGetData(email) {
        return new Promise((resolve, reject) => {
            const query = { Email: email };

            User.findOne(query)
                .then(data => {
                    if (!data) {
                        reject('User not found');
                    } else {
                        resolve(data);
                        console.log(data);
                    }
                })
                .catch(err => {
                    reject(err);
                });

        });
    }
    checkPass(user) {
        return new Promise((resolve, reject) => {
            
            const query = { Email: user["Email"] };
            User.findOne(query)
                .then(data => {
                    if (data) {
                        console.log("yes")
                        console.log(data);
                        console.log(user["Password"]);
                        const isMatch = bcrypt.compareSync(user["Password"], data.Password);

                        if (isMatch) {
                            resolve(data);
                        }
                        else {
                            reject(new Error("wrong password"))
                        }
                    } else {

                    }
                })
            


        })
    }
    updateUser(user) {
        return new Promise((resolve, reject) => {

            user["Password"] = bcrypt.hashSync(user["Password"], 10);

            let newUser = User(user);
            User.updateOne(
                { Email: newUser["Email"] },
                {
                    $set: {
                        Password: newUser["Password"],
                        VerificationCode: newUser["VerificationCode"]
                    }
                }).then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })

        });
    }
    checkEmailOnly(user) {
        return new Promise((resolve, reject) => {
            const query = { Email: user.Email }; // Proper query object
            User.findOne(query)
                .then(data => {
                    if (data) {
                        
                        resolve(data);
                    } else {
                        
                        resolve({});
                    }
                })
                .catch(err => {
                    // Handle any database errors
                    reject(err);
                });
        });
    }
    

    sendEmail(user) {
        return new Promise((resolve, reject) => {
            var message = {
                "from": "waelalmallah7@gmail.com",
                "to": user["Email"],
                "subject": "Verification Code for one use",
                "text": ` Hello "${user["UserName"]}" the Verification Code for one use is : ${ user["VerificationCode"]}`,
            };
            Transporter.sendMail(message, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    console.log("Email sent !")
                    resolve(info);
                }
            });
        });
    }
}


module.exports = Database;