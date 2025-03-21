import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'

function EditUser() {
    const {id} = useParams()
    const history = useHistory()
    const [editUser, setEditUser] = useState([])

    const users = useSelector(state => state.users)
    const token = useSelector(state => state.token)

    const [checkAdmin, setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [num, setNum] = useState(0)
    
    useEffect(() => {
        if(users.length !== 0){
            users.forEach(user => {
                if(user._id === id) {
                    setEditUser(user)
                    setCheckAdmin(user.role === 1 ? true : false)
                }
            })
        } else {
            history.push('/profile')
        }
    }, [users, id, history])

    const handleUpdate = async () => {
        try {
            if(num % 2 !== 0)
            {
                const res = await axios.patch(`/user/update_role/${editUser._id}`, {role: checkAdmin ? 1 : 0}, {
                    headers: {Authorization: token}
                })

                setSuccess(res.data.msg)
                setNum(0)
            }
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const handleCheck = () => {
        setSuccess('')
        setErr('')
        setCheckAdmin(!checkAdmin)
        setNum(num + 1)
    }

    return (
        <div className="edit_user">
            <button onClick={() => history.goBack()} className="go_back auth_back"><i className="fas fa-long-arrow-alt-left"></i> Go back</button>
            <div className="login_container">
                <div className="login_page">
                <h2 className="margin-btm-high">Edit User</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="auth_input" type="text" name="name"  defaultValue={editUser.name} placeholder="Your name" disabled/>
                </div>
                <div className="form-group margin-btm-huge">
                    <label htmlFor="email">Email</label>
                    <input className="auth_input" type="email" name="email"  defaultValue={editUser.email} placeholder="Your email address" disabled/>
                </div>
                <div className="form-group margin-btm-huge">
                    <input type="checkbox" id="isAdmin" checked={checkAdmin} onChange={handleCheck} />
                    <label htmlFor="isAdmin">isAdmin</label>
                </div>
                <button className="auth_button" onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default EditUser
