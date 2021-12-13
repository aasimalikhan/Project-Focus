import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification' 
import {dispatchLogin} from '../../../redux/actions/authAction' //action
import {useDispatch, connect} from 'react-redux' //to dispatch the action
import { GoogleLogin } from 'react-google-login';
import Bounce from 'react-reveal/Bounce';


const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login(props) {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password, err, success} = user;


    //Whenever any input value in the form is changed
    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value, err: '', success: ''})
    }
    

    //Whenever submit in the form is clicked
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password}) //posts our email and password taken from the input to the specific url
            setUser({...user,  success: res.data.msg})

            localStorage.setItem('firstLogin', true) 
         
            //The below dispatch only sets loggedIn to true, nothing else
            //From here App.js knows that isLoggedIn is changed so it then do further calcs in App.js
            dispatch(dispatchLogin()) //Dispatching action as we log into the app
            //after logging in the user, redirect the user to the home page 
            // will set loggedIn in the state to become true
            history.push("/") //Redirecting to home page

        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseGoogle = async (response) => {
        // TODO: 

        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    
    return (
        <Bounce bottom>
        <div className="login_container">
            <div className="login_page">
                <h2 className="margin-btm-med">Login</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <form onSubmit={handleSubmit}>
                    <div className="margin-btm-low">
                        <label className="auth_label" htmlFor="email">Email Address</label>
                        <input type="email" className="auth_input" placeholder="Enter email address" id="email" value={email} name="email" onChange={handleChangeInput}/>
                    </div>

                    <div className="margin-btm-huge">
                        <label className="auth_label" htmlFor="password">Password</label>
                        <input className="auth_input" type="password" placeholder="Enter password" id="password" value={password} name="password" onChange={handleChangeInput}/>
                    </div>

                    <div className="row margin-btm-med">
                        <button className="auth_button" type="submit">Login</button>
                        <Link to="/forgot_password">Forgot your password</Link>
                    </div>
                </form>
                <div className="login_with_buttons">
                    <div className="hr">Or Login With</div>
                    <div className="hr">(Under development)</div>
                    {/* <div className="social_buttons">
                    <GoogleLogin
                        clientId="348968778776-lvr3st0513fgncc9clk6ftscmuabv9fe.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    </div> */}
                </div>
                <p>New Customer? <Link to="/register">Register</Link></p>

            </div>
        </div>
        </Bounce>
    )
}
const mapStateToProps = (state) => {
    return {state}
}
// this function says that we're going to take our state's object, essentially all of
// the data that's inside redux store and make some calculations such that it
// appears as props inside the mentioned component

// The connect() function connects a React component to a Redux store.
export default connect(mapStateToProps)(Login);