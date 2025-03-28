import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {dispatchGetAllUsers, fetchAllUsers} from '../../../redux/actions/usersAction'
import Fade from 'react-reveal/Fade';
import Loader from "react-loader-spinner";


// import usersReducer from '../../../redux/reducers/usersReducer'
import Modal from 'react-modal';

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

Modal.setAppElement('#yourAppElement');

function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const [avatar, setAvatar] = useState(false)
    const {name, password, cf_password, err, success} = data
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const [loadingLoader, setLoadingLoader] = useState(true)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
            setLoadingLoader(false);
        }
    }, [token, isAdmin, dispatch, callback])

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar,
            }, {headers: {
                Authorization: token
            }})

            setData({...data, err: '', success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password))
        {
            return setData({...data, err: "Password must be atleast 6 characters.", success: ''})
        }

        if(!isMatch(password, cf_password))
        {
            return setData({...data, err: "Password did not match.", success: ''})
        }
        try {
            axios.post('/user/reset', {password}, {headers: {
                Authorization: token
            }})

            setData({...data, err: '', success: "Password Changed Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar) updateInfor()
        if(password) updatePassword()
    }

    const handleDelete = async (id) => {
        try {
            if(user._id !== id)
            {
                if(window.confirm("Are you sure you want to delete this account?"))
                {
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            } 
        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    const changeAvatar = async(e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded.", success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large.", success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect.", success: ''})

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <>
        <div id="section_main" className="profile_page">
            <Fade left>
            <div className="col-left">
                <h2 className="user_heading margin-btm-high">{isAdmin ? "Admin Profile" : "User Profile"}</h2>
                
                <div className="avatar">
                    <img onClick={openModal} src={avatar ? avatar : user.avatar} alt=""/>
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                        <div className="modal_container">   
                            <img className="modal_image" onClick={openModal} src={avatar ? avatar : user.avatar} alt=""/>
                        </div>
                    </Modal>
                    <span className="image_change">
                        <i className="fas fa-camera"></i>
                        <p className="image_change_text">Change</p>
                        <input type="file" name="file" id="file_up" onChange={changeAvatar}/>
                    </span>
                </div>
                

                <div className="form-group">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                {loading && <h3 className="loading_message">Loading....</h3>}
                    <label htmlFor="name">Name</label>
                    <input className="auth_input" type="text" name="name" id="name" defaultValue={user.name} placeholder="Your name" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="auth_input" type="email" name="email" id="email" defaultValue={user.email} placeholder="Your email address" disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input className="auth_input" type="password" name="password" id="password" placeholder="Your password" value={password} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cf_password">New Password</label>
                    <input className="auth_input" type="password" name="cf_password" id="cf_password" placeholder="Confirm Password" value={cf_password} onChange={handleChange}/>
                </div>
                <div className="margin-btm-med">
                    <em className="form-warning" style={{color: "crimson"}}>
                        * If you update your password here, you will not be able to login quickly using google and facebook.
                    </em>
                </div>
                <button className="auth_button" disabled={loading} onClick={handleUpdate}>Update</button>
                
            </div>
            </Fade>
            <Fade right>
            <div className="col-right">
                <h2 className="user_heading margin-btm-high">{isAdmin ? "Users" : ""}</h2>
                {(isAdmin && !loadingLoader) ? 
                <div style={{overflowX: "auto"}}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <th className="table_headings" >ID</th>
                                <th className="table_headings">Name</th>
                                <th className="table_headings">Email</th>
                                <th className="table_headings">Admin</th>
                                <th className="table_headings">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role === 1 ? <i className="fas fa-check" title="Admin"></i> : <i className="fas fa-times" title="User"></i> }</td>
                                    <td><Link to={`/edit_user/${user._id}`}>
                                            <i className="fas fa-edit" title="Edit"></i>
                                        </Link>
                                        <i className="fas fa-trash-alt" title="Remove" onClick={() => handleDelete(user._id)}></i>
                                        </td>
                                    </tr>
                                ))
                            }  
                        </tbody>
                    </table>
                </div> : <Loader
                    type="Watch"
                    color="#FF0000"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />}
            </div>
            </Fade>
        </div>
        </>
    )
}

export default Profile
