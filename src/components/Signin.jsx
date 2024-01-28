import { useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/input";
import { Navigate } from "react-router-dom";
import axios from "axios";
export const Signin = ()=>{
    const usernameRef = useRef()
    const passwordRef = useRef()
    const [loading , setLoading] = useState(false)
    const [success , setSuccess] = useState(false)
    const [faild , setFaild] = useState(false)
    if(localStorage.getItem('token')){
        return <Navigate to="/dashbord" />
    }
    const hadleSignin = ()=>{
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      setLoading(true)
      const param ={
       
      }
      axios.post("http://localhost:3001/api/v1/user/signin" , {
        username:username,
        password:password
      } )
      .then(res=>{
        setLoading(false)
        setSuccess(true)
        console.log(res.data.msg)
        localStorage.setItem("token" , res.data.msg)
        return <Navigate to="/dashbord" />
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
        setFaild(true)
        setTimeout(()=>{
          setFaild(false)
        },1000)
      })
    }
    return(
    
        <div className="form">
        <div className="form-header flex flex-col gap-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Sign In</h1>
          <p className="text-small max-w-[300px] mb-3 font-thin opacity-70">
            Enter your credentials to access your account
          </p>
        </div>
  
        <Input ref={usernameRef} placeholder="example@gmail.com" type="text" label="Username" />
        <Input ref={passwordRef} placeholder="" type="text" label="Password" />
  
  <div className="mt-4" onClick={hadleSignin}>
    <Button width="w-full" fail={faild} loading={loading} success={success} title="Sign In" />
  </div>
        
  
        <div className="flex gap-2 justify-center mt-3 ">
        <p className="font-semibold">Don't have an account ?</p>
        <a className="underline ">Sign Up</a>
      </div>
      </div>
    )
}