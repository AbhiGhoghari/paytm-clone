import React from "react"

export const Input = React.forwardRef((
    props,
    ref
)=>{
    return(
        <div className="field">
          <p className="p mb-2 font-bold">{props.label}</p>
          {
            props.Search ? (
                <input  onChange={props.handleSearch} placeholder={props.placeholder || ''} type={props.type} className="input rounded p-2 w-full" />
            ):(
                <input ref={ref} placeholder={props.placeholder || ''} type={props.type} className="input rounded p-2 w-full" />
            )
          }
         
        </div>

       
    )
   
})