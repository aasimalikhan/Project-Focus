const Users = require('../models/userModel')
const Pomodoro = require('../models/pomodoroModel')
const Medal = require('../models/medalModel.js')
const Challenge = require('../models/challengeModel.js')
const Task = require('../models/taskModel')
const Announcement = require('../models/AnnouncementModel')
const Issue = require('../models/issueModel')

const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {google}  = require('googleapis')
const {OAuth2} = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

let {CLIENT_URL, APPLICATION_STATUS} = process.env
if(APPLICATION_STATUS === 'production')
{
    CLIENT_URL = 'https://project-focus.herokuapp.com'
}

const userCtrl = {
    register: async (req, res) => {
        try {
            //Getting username, email and password from body
            const {name, email, password} = req.body
            if(!name || !email || !password) 
                return res.status(400).json({msg: "Please fill in all fields."})

            //Checking if the email is valid 
            //Basically a regex expression which checks for validity of the email
            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid Email."})

            //We check if the user we are about to create already exists with the same email
            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: 'This email address is already taken'})

            //Condition for password length
            if(password.length < 6)
                res.status(400).json({msg: 'Password must be atleast 6 characters'})

            //hashing the password
            const passwordHash = await bcrypt.hash(password, 12)

            //creating new user with the provided credentials
            const newUser = {
                name, email, password: passwordHash
            }
            
            

            //Creating an activation token for registering through gmail
            const activation_token = createActivationToken(newUser)

            //We create a url to redirect the user with the jwt token
            const url = `${CLIENT_URL}/user/activation/${activation_token}`

            //to the sendMail function, the sender email and the url where user can register is supplied
            sendMail(email, url, "Verify your email address").then(res => {
            }).catch (err => {
                console.log(err)
                res.status(500).json({msg: err.message})
            })


            res.json({msg: "Register Success! Please activate your account to start"})
            
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    activateEmail: async(req, res) => {
        try {
            const {activation_token} = req.body

            //The token send to the user to his mail is being verified
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            //From the jwt we can get all the payload of the user
            const {name, email, password} = user

            //We check if the user with the mail already exists
            const check = await Users.findOne({email})
            if(check) return res.status(500).json({msg: "This email already exists."})

            //We create a new User Object using Model
            const newUser = new Users({
                name, email, password
            })

            //We add newUser object to the database
            await newUser.save();

            //The account has finally been activated
            res.json({msg: "Account has been activated!"})
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    addSession: async(req, res) => {
        // TODO: async await
        // FIXME:
        const {email, sessiontime, date} = req.body
        try {
            const newSessionComplete = new Pomodoro();
            newSessionComplete.email = email;
            newSessionComplete.sessiontime = sessiontime;
            newSessionComplete.date = date;
            newSessionComplete.save().then((result) => {
                Users.findOne({email: email}, (err, user) => {
                    if(user)
                    {
                        user.PomodoroSessions.push(newSessionComplete)
                        user.save();
                        res.json({ message: 'Review Created!'});
                    }
                })
            }).catch((err) => {
                return err;
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async(req, res) => {
        try {
            //Taking email and password from body
            const {email, password} = req.body;

            //checking whether user exists in database
            const user = await Users.findOne({email})

            if(!user)
            {
                return res.status(400).json({msg: "This email does not exist."})
            }

            //if password matches
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            //creating a refresh token with cookie
            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login Success!"});
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAccessToken: (req, res) => {
        try {
            //Accessing the refresh token made in the login
            const rf_token = req.cookies.refreshtoken;

            //if the refresh token is invalid / expired then make the user login again
            if(!rf_token) return res.status(400).json({msg: "Please Login again!"})

            //Verifying if the token is valid
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({id: user.id})
                res.json({access_token});
            })
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    forgotPassword: async (req, res) => {
        try {
            //Getting email from 
            const {email} = req.body;

            //Finding the user with that email
            const user = await Users.findOne({email});
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            //creating access token for password change using email
            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`;

            //Sending email making a url with token
            sendMail(email, url, "Reset your password")
            res.json({msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    resetPassword: async (req, res) => {
        try {
            //Here we are changing the password
            const {password} = req.body;

            if(password.length < 6)
                res.status(400).json({msg: 'Password must be atleast 6 characters'});
            
            //We hash the password
            const passwordHash = await bcrypt.hash(password, 12)

            //We make use of auth(made) middleware which takes the Authorization token from the header
            //and gets the details of user (id) from the token, and makes req.user = user;
            //We find the user with the email
            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUserInfor: async (req, res) => {
        try {
            //uses middleware to get user data using authorization header
            const user = await Users.findById(req.user.id).select('-password');
            res.json(user)
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUsersAllInfor: async (req, res) => {
        try {
            //uses middleware to get user data using authorization header
            const users = await Users.find().select('-password')

            res.json(users);
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({ msg: "Logged out."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateUser: async (req, res) => {
        try {
            const {name, avatar} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                name, avatar
            })

            res.json({msg: "Updated Successfully!"})
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body
            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Updated Successfully!"})
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userDeleted = await Users.findByIdAndDelete({_id: req.params.id})
            const {email} = userDeleted;
            const docsDeleted = await Pomodoro.find({email: email}).remove();
            res.json({msg: "Deleted Successfully!"})
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //Pomodoro Session data
    getPomodoroSessions: async (req, res) => {
        try {
            //uses middleware to get user data using authorization header
            const user = await Users.findById(req.user.id).select('-password');
            const pomodoroSessions = user.PomodoroSessions;
            const data = await Pomodoro.find({ '_id': { $in: pomodoroSessions}}).sort({date: -1});
            res.json(data)
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //Medal Data in Database
    getMedalsData: async (req, res) => {
        try {
            //uses middleware to get user data using authorization header
            const medals = await Medal.find();
            res.json(medals)
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //All Challenge Data in Database
    getChallengeData: async (req, res) => {
        try {
            //uses middleware to get user data using authorization header
            const challenges = await Challenge.find();
            res.json(challenges)
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getLeaderBoard: async(req, res) => {
        try {
            //Mongoose Aggregation
            const leaderBoard = await Pomodoro.aggregate([
                    {$group : {_id : {email: "$email"}, "email": { "$first": "$email" },total: { $sum: "$sessiontime" }}},
                    {$sort: {"total": -1}},
                    {$lookup: {
                        from: "users",
                        localField: "email",
                        foreignField: "email",
                        as: "data"
                    }},
                    {$unwind:"$data" },
            ])

            res.json(leaderBoard)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getDaysAccessed: async (req, res) => {
        try {
            //Getting total number of days the user has accessed the application
            const user = await Users.findById(req.user.id).select('-password');
            const pomodoroSessions = user.PomodoroSessions;
            const data = await Pomodoro.aggregate([
                { $match: {
                    '_id': { $in: pomodoroSessions}
                }},
                {
                    $project: {
                      _id: 0,
                      date: {
                        $dateToString: {
                          format: "%Y%m%d",
                          date: "$date"
                        }
                      }
                    }
                  },
                  {
                    $group: {
                      _id: "$date"
                    }
                  }
            ]);
            res.json(data)
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    googleLogin: async (req, res) => {
       
            try {
                const {tokenId} = req.body
    
                const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
                
                const {email_verified, email, name, picture} = verify.payload
    
                const password = email + process.env.GOOGLE_SECRET
    
                const passwordHash = await bcrypt.hash(password, 12)
    
                if(!email_verified) return res.status(400).json({msg: "Email verification failed."})
    
                const user = await Users.findOne({email})
    
                if(user){
                    const isMatch = await bcrypt.compare(password, user.password)
                    if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
    
                    const refresh_token = createRefreshToken({id: user._id})
                    res.cookie('refreshtoken', refresh_token, {
                        httpOnly: true,
                        path: '/user/refresh_token',
                        maxAge: 7*24*60*60*1000 // 7 days
                    })
    
                    res.json({msg: "Login success!"})
                }else{
                    const newUser = new Users({
                        name, email, password: passwordHash, avatar: picture
                    })
    
                    await newUser.save()
                    
                    const refresh_token = createRefreshToken({id: newUser._id})
                    res.cookie('refreshtoken', refresh_token, {
                        httpOnly: true,
                        path: '/user/refresh_token',
                        maxAge: 7*24*60*60*1000 // 7 days
                    })
    
                    res.json({msg: "Login success!"})
                }
    
    
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
    },

    addTask: async (req, res) => {
        try {
            const task = await new Task(req.body).save();
            res.json(task);
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },  

    //Announcements
    addAnnouncement: async (req, res) => {
        try {
            const {announcementtype, date, email, announcementname, announcementdescription} = req.body;
            const announcements = await new Announcement({
                announcementtype, date, email, announcementname, announcementdescription
            }).save();
            res.json({msg: "Announcement posted!"})
            

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAnnouncements: async (req, res) => {
        try {
            const announcementData = await Announcement.find().sort({date: -1});
            res.json(announcementData);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //Issues
    addIssue: async (req, res) => {
        try {
            const {issueName, issueType, issueDescription, email, date} = req.body;
            const issues = await new Issue({
                issueName, issueType, issueDescription, email, date
            }).save();

            res.json({msg: "Issue Created!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getIssues: async (req, res) => {
        try {
            const issueData = await Issue.find();
            res.json(issueData);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteIssue: async (req, res) => {
        try {

            const issueDeleted = await Issue.findByIdAndDelete({_id: req.params.id})
            // const docsDeleted = await Pomodoro.find({email: email}).remove();
            // console.log("docs deleted: ",docsDeleted)
            // res.json({msg: "Deleted Successfully!"})
            // const issueData = await Issue.find();
            res.json(issueData);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
 
    getTask: async (req, res) => {
        try {
            const tasks = await Task.find();
            res.json(tasks);
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateTask: async (req, res) => {
        try {
            const task = await Task.findOneAndUpdate({
                _id: req.params.id 
            }, req.body);
            res.json(task);
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteTask: async (req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);
            res.json(task);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //Statistics
    getStatsForDate:  async (req, res) => {
        try {
            const data = req.params.date.toString().split("-");
            // console.log(data[0]+"-"+data[1]+"-"+data[2])
            const day = data[0];
            const nextDay = Number(day) + 1
            const month = data[1];
            const year = data[2];

            const newDate = new Date(year, month, day);

            const user = await Users.findById(req.user.id).select('-password');
            const pomSess = user.PomodoroSessions;

            
            const pomodoroSessionsOnDate = await Pomodoro.aggregate([
                { $match: {
                    '_id': { $in: pomSess},
                    date: {
                        '$gte': new Date(year, month, day),
                        '$lt': new Date(year, month, nextDay)
                    }
                }},
            ])


            // const main_data = await Pomodoro.find({
            //     date: {
            //         $gte: new Date(year, month-1, day), 
            //         $lt: new Date(year, month-1, day+1)
            //     }
            // })
            // const data = await Pomodoro.aggregate([
            //     { $match: {
            //         '_id': { $in: pomodoroSessions}
            //     }},
            //     {
            //         $project: {
            //           _id: 0,
            //           date: {
            //             $dateToString: {
            //               format: "%Y%m%d",
            //               date: "$date"
            //             }
            //           }
            //         }
            //       },
            //       {
            //         $group: {
            //           _id: "$date"
            //         }
            //       }
            // ]);
            // console.log("When I access: ", data);
            // res.json(data)
            // const {name, avatar} = req.body
            // await Users.findOneAndUpdate({_id: req.user.id}, {
            //     name, avatar
            // })

            res.json(pomodoroSessionsOnDate)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },


    getStatsForMonth: async (req, res) => {
        try {

        const user = await Users.findById(req.user.id).select('-password');
        const pomSess = user.PomodoroSessions;
        const currentYear = new Date().getFullYear();
        
        const pomodorosMonthly = await Pomodoro.aggregate([
                {
                    $match: {
                        '_id': {$in: pomSess},
                        'date': {
                            $gte: new Date(currentYear,0,1),
                            $lte: new Date(currentYear,11,31)
                        }
                    
                    }
                },
                {
                    $group: {
                        _id: {
                            year: {$year: "$date"},
                            month: {$month: "$date"}
                        },
                        total_in_month: { $sum: "$sessiontime" }
                        
                    }
                },
            
        ])

        res.json(pomodorosMonthly)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    }

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10h'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '10h'})
}

module.exports = userCtrl