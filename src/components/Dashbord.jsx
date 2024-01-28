import "./dashbord.css";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import React, { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import {  Navigate } from "react-router-dom";

export const Dashbord = () => {
  
    
    if(!localStorage.getItem("token")){
        return <Navigate to="/signup"/>
    }
  
  const [balance, setBalance] = useState();
  const [users, setUsers] = useState([]);
  const [model , setModel] = useState(false)
  const [selectUser , setSelectUser] = useState([])
  let debouceTimer;
  const debounce = (func, delay) => {
    clearTimeout(debouceTimer);
    debouceTimer = setTimeout(func, delay);
  };

  const handleSearch = (e) => {
    const params = {
      param: e.target.value,
    };
    debounce(() => {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3001/api/v1/user/bulk", {
          headers: {
            "Content-Type": "application/json",
            authentication: token,
          },
          params: params,
        })
        .then((res) => {
          console.log(res.data.msg);
          setUsers(res.data.msg);
        });
    }, 800);
  };

  const getBalance = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/api/v1/account/balance", {
        headers: {
          "Content-Type": "application/json",
          authentication: token,
        },
      })
      .then((res) => {
        setBalance(res.data.balance);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUsers = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/api/v1/user/bulk", {
        headers: {
          "Content-Type": "application/json",
          authentication: token,
        },
      })
      .then((res) => {
        console.log(res.data.msg);
        setUsers(res.data.msg);
      });
  };

  const sendMoney = (index)=>{
   
        const data = users[index]
        setModel(true)
        console.log(data)
        setSelectUser(data)
        
  }

  useEffect(() => {
    getBalance();
    getUsers();
  
  }, []);
  return (
    <div className="container px-9">
    
      <h1 className="text-2xl py-4 font-semibold">Your Balance ₹{balance}</h1>

      <p className="text-2xl font-semibold mt-4 mb-3">User</p>
      <Input
        type="text"
        Search="true"
        handleSearch={handleSearch}
        placeholder="Search User"
      />
      <User users={users} send={sendMoney} />
    {
         model ? (
            <Model data={selectUser} setModel={setModel}/>
        ):null
    }
      
    </div>
  );
};

const User = memo(({ users , send  }) => {
  return (
    <div className="users my-9">
      {users.length > 0 &&
        users?.map((user, index) => (
          <div key={index} className="user my-6 flex w-full items-center gap-6">
            <div className="name flex justify-center items-center rounded-full w-[40px] h-[40px] bg-gray-400">
              <p className="font-bold">{user.firstname[0]}</p>
            </div>
            <p className="text-2xl font-semibold mr-auto">
              {user.firstname + " " + user.lastname}
            </p>
            <a onClick={()=>send(index)} className={`btn bg-black  text-white py-2 px-5  block text-center rounded`}>Send Money</a>
          </div>
        ))}
    </div>
  );
});

const Model = memo(({data , setModel}) => { 
    const amountRef = useRef()
    const [loading , setLoading] = useState(false)
    const [success , setSuccess] = useState(false)
    const sendMoney = ()=>{
        console.log(amountRef.current.value)
        console.log(data.username)
        const token = localStorage.getItem("token")
        setLoading(true)
        axios.post("http://localhost:3001/api/v1/account/transfer" ,{
           
                to:data.username,
                amount:amountRef.current.value
            
        }, {
            headers: {
                "Content-Type": "application/json",
                 authentication: token,
              },
            
        })
        .then(res=>{
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
                setLoading(false)
            },3000)
        })
        .catch(err=>{
            alert(err)
            setLoading(false)
        })
    }
  return (
    <>
      <div className="model-wrapper bg-white border-2  border-solid border-gray-200 shadow-xl">
        <div className="model p-6 w-[350px] flex flex-col gap-4">
          <h1 className="text-2xl text-center font-semibold">Send Money</h1>
          <div className="flex gap-3 items-center my-2">
            <div className="name flex justify-center items-center rounded-full w-[40px] h-[40px] bg-gray-400">
              <p className="font-bold">{data.firstname[0]}</p>
            </div>
            <p className="text-2xl font-semibold">{data.firstname}</p>
          </div>
          <Input ref={amountRef} label="Amount (in Rs)" placeholder="Enter Amount"  />
          <div onClick={sendMoney}>
          <Button loading={loading} success={success} title="Transfer" width="w-full" />
          </div>
         
       
        </div>
          <MdClose onClick={()=>setModel(false)} className="close" />
      </div>
    </>
  );
});
