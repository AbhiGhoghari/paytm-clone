import '../App.css'
import { useRecoilValue } from "recoil";
import {user} from '../atom/Atom'
import { useEffect, useState } from 'react';

export const Header = ()=>{
    const [user ,setUser] = useState()
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')))
    },[])
    
    return(
        <div className="container sticky top-0 z-10 bg-white     px-9 border-b-2 border-gray-200 border-solid">
   <div className="header w-full flex justify-between items-center py-5 ">
            <h1 className='text-2xl font-semibold'>Payment App</h1>
            <div className="profile flex gap-5 items-center ">
                <p className='font-bold'>Hello, {user?.firstname}</p>
                <div className="name flex justify-center items-center rounded-full w-[40px] h-[40px] bg-gray-400">
                    <p className='font-bold'>{user ? user.firstname[0] : "u"}</p>
                </div>
            </div>
        </div>

        </div>
     
    )
}