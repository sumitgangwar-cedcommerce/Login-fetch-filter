import React from 'react'
import { TextField, Button , Heading} from '@shopify/polaris';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    var [username , setUsername] = useState('admin')
    var [password , setPassword] = useState('password123')
    var [isLoading , setIsLoading] = useState(false)
    var [err , setErr] = useState('')

    let nav = useNavigate()
    console.log(nav)
  
    const handleUsernameChange = useCallback((data) => setUsername(data) , [])
    const handlePasswordChange = useCallback((data) => setPassword(data) , [])
  
  
    const submitHandler = async()=>{
        setIsLoading(true)
        const url = `https://fbapi.sellernext.com/user/login?username=${username}&password=${password}`
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA'
        const option = {
            headers : {'Authorization' : token}
        }
        await  fetch(url , option).then(res=>res.json()).then(res=>{
            if(res.success){
                sessionStorage.setItem('user' , res.data.token)
                nav('dashboard')
            }
            else{
                setErr(res.message)
            }
        })
        setIsLoading(false)
    }
  
    return (
      <div>
        <Heading
          h1
        >
          Login
        </Heading>
  
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          helpText={<span>We’ll use this address if we need to contact you about your account.</span>}
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          helpText={<span>We’ll use this address if we need to contact you about your account.</span>}
          autoComplete="email"
        />
        <Button
          onClick={submitHandler}
          primary
          loading = {isLoading}
        >
          Submit
        </Button>

        <div>{err}</div>
      </div>
    );
}

export default Login