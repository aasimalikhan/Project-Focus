const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl')
//Middlewares
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

//Routes
//Registering Users
router.post('/register', userCtrl.register)

//Activating Users by validating email and adding them into database
router.post('/activation', userCtrl.activateEmail)

//Loggin in users and creating refresh token and saving into cookie
router.post('/login', userCtrl.login)
router.post('/google_login', userCtrl.googleLogin) //google login functionality

//Creating refresh token for login
router.post('/refresh_token', userCtrl.getAccessToken) //refresh token created after every login for a limited session of login

//Forgot Password
router.post('/forgot', userCtrl.forgotPassword) //user forgot their password

router.post('/reset', auth, userCtrl.resetPassword) //resetting of password by user

router.get('/infor', auth, userCtrl.getUserInfor) //getting a single user information by user

router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor) //getting information of all users by the admin

router.get('/logout', userCtrl.logout) //logout by user

router.patch('/update', auth, userCtrl.updateUser) //updating details of user (profile, password, etc..)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole) // updating role of a user by admin

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser) //for deleting a user by admin

router.post('/add_session', userCtrl.addSession) //for adding session into database

router.get('/medals_data', userCtrl.getMedalsData) //for adding session into database

router.get('/challenge_data', userCtrl.getChallengeData) //for adding session into database

router.get('/get_leaderboard_data', userCtrl.getLeaderBoard) //for adding session into database

//Social Login

//Tasks Router
router.post("/tasks/", userCtrl.addTask);

router.get("/tasks/", userCtrl.getTask);

router.put("/tasks/:id", userCtrl.updateTask);

router.delete("/tasks/:id", userCtrl.deleteTask);

//Announcements
router.post("/add_announcement", auth, authAdmin, userCtrl.addAnnouncement);

router.get("/announcement_data", userCtrl.getAnnouncements);

//Issues 
router.post("/add_issue", userCtrl.addIssue);

router.get("/issue_data", auth, authAdmin, userCtrl.getIssues);

// router.patch('/update_issuestatus/:id', auth, authAdmin, userCtrl.updateIssueStatus) // updating role of a user by admin

router.delete('/delete_issue/:id', auth, authAdmin, userCtrl.deleteIssue) //for deleting a user by admin

//Pomodoro Data
router.get('/pomodoros', auth, userCtrl.getPomodoroSessions)

//Detailed Statistics for a specific date
router.get('/detailed_stats/:date', auth, userCtrl.getStatsForDate) // updating role of a user by admin

//Total Number of days the user has accessed the application
router.get('/days_accessed', auth, userCtrl.getDaysAccessed)

router.get('/monthly_data', auth, userCtrl.getStatsForMonth)

module.exports = router


