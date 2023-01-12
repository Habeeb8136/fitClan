import React, { useEffect, useState } from 'react';
import './exercise.css';
import Plans from './plans';
import Exdata from '../../ExerciseData.json';
import ExerciseCard from './ExerciseCard'
import Model from 'react-body-highlighter';
import { BsSearch } from 'react-icons/bs';


const data = [
  { name: 'workout', muscles: ['chest', 'abs', 'calves'] },
];


export default function Exercise() {
  const exersiceData = Exdata;
  const [selectedPart, setSelectedPart] = useState('');
  const [exerciseData, setExerciseData] = useState([]);
  const [searchedData, setsearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');
  
  
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c6e2b18938msha7c9f9aaf806852p11f323jsndb10de3b72be',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };
    
    fetch('https://exercisedb.p.rapidapi.com/exercises', options)
      .then(response => response.json())
      .then(res => {
        setExerciseData(res)
        console.log(res)
      })
                .catch(err => console.error(err));
    
  }, []);

  const handleClick = (muscle) => {
    setSelectedPart(muscle.muscle)
    setWordEntered(selectedPart)
    setTimeout(() => {
      console.log(selectedPart)
      
    }, 1000);
    
    handleSearch()
  }

  const handleSearch = (e) => {
    setsearchedData('')
    const filteredData=exerciseData.filter(
  
      (item) => item.name.includes(wordEntered)
             || item.target.includes(wordEntered)
             || item.equipment.includes(wordEntered)
             || item.bodyPart.includes(wordEntered));

             setsearchedData(filteredData);
             

      
    console.log('searchedword',wordEntered)
  };
  
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
        data={data}
        style={{ width:'40%',padding: '1rem' }}
        highlightedColors={["#ff0000", "#0000ff"]}
        onClick={handleClick}
      />
        <Model
          type="posterior"
          style={{width:'40%', padding: '1rem' }}
          data={data}
          highlightedColors={["#ff0000", "#db2f2f"]}
          onClick={handleClick}
        />
      </div>


      <div className='search-exercise'>
      <h2 >Search Exercises For Details</h2>

      <div className="searchbar">
        <div className="searchinput">
          <input className="mealinput"
          onKeyPress={(e) => {
                        if (e.key === "Enter"){
                          handleSearch()
                        } }}
           value={wordEntered}
          onChange={e=>{setWordEntered(e.target.value)}}
          placeholder="Search Exercises/Body part/Target .."
          type="text"
          >
          </input>
          <BsSearch className="searchicon" onClick={handleSearch}/>
        </div>
        </div>
        </div>
      
    {searchedData !== 0 && (
          <ExerciseCard searchedData={searchedData}/>
        )}
        
    </div>
  )
}
