import React from 'react'
import './notification.css'

 export const showErrMsg = (msg) => {
     return <p className="errMsg">{msg}</p>
 }

 export const showSuccessMsg = (msg) => {
     return <p className="successMsg">{msg}</p>
 }
