import React, { useState } from 'react';
import './plans.css';

export default function plans({title,bg,pdf,details,catagory}) {
  
  

  return (
  <div className='exercise__plans' style={{backgroundImage:{bg}}}>
        <p>{title}</p>
        <p>{details}</p>
        <p>{catagory}</p>
        <a href={pdf}>download plan</a>
    </div>
  )
}
