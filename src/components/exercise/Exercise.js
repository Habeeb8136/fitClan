import React, { useEffect, useState } from 'react';
import './exercise.css';
import Plans from'./plans';
import data from '../../ExerciseData.json'
import Model, { IExerciseData, IMuscleStats } from 'react-body-highlighter';



export default function Exercise() {
  const exersiceData = data;
  
  function handleClick(){
    alert('clicked' )
  }
  
  return (
    <div className='exercise'>
      <h3>Your exercise plan is below:</h3>
      <div className="exercise_plans">
        <h3>Exercise Plans</h3>
        <div className="exercise_plans_container">
          <div className="goal_plan">
          {exersiceData.map((plan,index)=>{
            return(
            <Plans 
              title={plan.title}
              details={plan.details}
              catagory={plan.catagory}
              bg={plan.backgroudUrl}
              pdf={plan.pdfUrl}
            />

            )
            })}


            
          </div>
        </div>
      </div>
      <div className='choose-target'>
        <Model  
          
        
        highlightedColors={["#e65a5a", "#db2f2f"]}
        />
      </div>
    </div>
  )
}
