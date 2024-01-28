import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FaRegCheckCircle } from "react-icons/fa";

export  const Button =  (
    props
)=>{
    
    return(
        <div className={`relative flex  h-full justify-center items-center ${props.width ? props.width : ''}`}>
             <div className={`${props.loading ? 'loding' : 'null' }${props.success ? 'hidden':''}`}></div>
             <a onClick={!props.loading ? props.click : null } className={`btn   text-white py-2 px-5  block text-center rounded  ${props.width ? props.width : ''} ${props.loading ? 'cursor-not-allowed h-10' : ''} ${props.success ? 'bg-green-500 h-10': 'bg-stone-900'} ${props.fail ? 'bg-red-500' : 'bg-stone-900'}`} >{props.success || props.loading ? '' : props.title}</a> 
             <FaRegCheckCircle className={`check ${props.success ? 'block' : 'none'}`} />
        </div>
            
       
    )
}