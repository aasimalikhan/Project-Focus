import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Pomodoro from '../Pomodoro/Pomodoro'
import Studywith from '../Studywith/Studywith'
import ActivationEmail from './auth/ActivationEmail'
import Home from '../Home/Home'
import ForgotPassword from './auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'
import NotFound from '../utils/NotFound/NotFound'
import Profile from '../body/profile/Profile'
import EditUser from './profile/EditUser'
import BadgeDetails from '../BadgeDetails/BadgeDetails'
import ChallengeDetails from '../ChallengeDetails/ChallengeDetails'
import LeaderBoard from '../LeaderBoard/LeaderBoard'
import Announcement from '../Announcements/Announcement'
import MakeAnnouncement from '../Announcements/MakeAnnouncement/MakeAnnouncement'
import Issue from '../Issues/Issues'
import MakeIssues from '../Issues/MakeIssues/MakeIssues'
import Resources from '../Resources/Resources'
import Tasks from '../Tasks/Tasks'
import DetailedStatistics from '../Detailed_Statistics/Detailed_Statistics'
import Merchandise from '../Merchandise/Merchandise'
import Premium from '../Premium/Premium'
 
import {useSelector} from 'react-redux'

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/login" component={ isLogged ? NotFound : Login} exact/>
                <Route path="/register" component={ isLogged ? NotFound : Register} exact/>
                <Route path="/pomodoro" component={Pomodoro} exact/>
                <Route path="/studywith" component={Studywith} exact/>
                <Route path="/user/activation/:activation_token" component={ActivationEmail} exact/>
                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact/>
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact/>
                <Route path="/profile" component={isLogged ? Profile : NotFound} exact/>
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact/>
                <Route path="/badge_details" component={BadgeDetails} exact/>
                <Route path="/challenge_details" component={ChallengeDetails} exact/>
                <Route path="/get_leaderboard" component={LeaderBoard} exact/>
                <Route path="/get_announcements" component={Announcement} exact/>
                <Route path="/make_announcement" component={isAdmin ? MakeAnnouncement : NotFound} exact/>
                <Route path="/make_issue" component={isLogged ? MakeIssues : NotFound} exact/>
                <Route path="/get_issues" component={isAdmin ? Issue : NotFound} exact/>
                <Route path="/edit_issue/:id" component={isAdmin ? EditUser : NotFound} exact/>
                <Route path="/tasks" component={Tasks} exact/>
                <Route path="/resources" component={Resources} exact />
                <Route path="/detailed_statistics" component={isLogged ? DetailedStatistics : NotFound} exact />
                <Route path="/merchandise" component={Merchandise} exact />
                <Route path="/premium" component={Premium} exact />
                <Route path='*' exact component={NotFound} />
            </Switch>
        </section>
    )
}

export default Body
