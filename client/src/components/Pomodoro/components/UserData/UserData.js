import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'ract-redux'

function UserData() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)

    const {user, isAdmin} = auth

    const dispatch = useDispatch();
    
    return (
        <div>
            
        </div>
    )
}

export default UserData
