import React, { useState } from 'react';
import './plans.css';

export default function plans(props) {
  
  

  return (
  <div className='exercise__plans' >
  <img style={{height:"100%",width:"100%"}} src={props.bg} alt=""></img>
        <p>{props.title} {props.bg}</p>
        <p>{props.details}</p>
        <p>{props.catagory}</p>
        <a href={props.pdf}>download plan</a>
    </div>
  )
}
