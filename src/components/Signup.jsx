import { Button } from "../ui/Button";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import axios from "axios";
import "./style.css";
import { NavLink, Navigate } from 'react-router-dom';



export const Signup = () => {
  

 
    
    const firstRef = useRef()
    const lastRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    
    const [loading , setLoading] = useState(false)
    const [success , setSuccess] = useState(false)
    if(localStorage.getItem("token")){
      
      return <Navigate to="/dashbord"/>
  }
    const handleSignUp = ()=>{
        
        const firstname = firstRef.current.value;
        const lastname = lastRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        setLoading(true)
        const singupData = {
            firstname:firstname,
            lastname:lastname,
            username:username,
            password:password
        }
        axios.post('http://localhost:3001/api/v1/user/signup', singupData)
                .then((res)=>{
                    setSuccess(true)
                  const dummyuser =   {
                      username:res.data.username,
                      firstname:res.data.firstname,
                      lastname:res.data.lastname
                    }
                    localStorage.setItem("user" , JSON.stringify(dummyuser))
                    localStorage.setItem("token" , res.data.token)
                    setTimeout(()=>{
                        return navigate("/dashbord")
                    },500)
                    
                    
                })
                .catch((err)=>{
                    
                    setLoading(false)
                })
        
    }
  return (
    <div className="form flex flex-col gap-4 ">
      <div className="form-header text-center">
        <h1 className="text-4xl font-bold mb-3">Sign Up</h1>
        <p className="text-small max-w-[300px] mb-3 font-thin opacity-70">
          Enter your information to create an account
        </p>
      </div>

      <Input ref={firstRef} placeholder="John" type="text" label="First Name" />
      <Input ref={lastRef} placeholder="Doe" type="text" label="Last Name" />

      <Input ref={usernameRef} placeholder="example@gmail.com" type="text" label="User Name" />

      <Input ref={passwordRef} type="text" label="Password" />
      <Button width="w-full" success={success} loading={loading} click={handleSignUp} title="Sign Up" />

      <div className="flex gap-2 justify-center mt-3">
        <p className="font-semibold">Already have an account ?</p>
        <NavLink to='/signin' className="underline">Login</NavLink>
      </div>
    </div>
  );
};
