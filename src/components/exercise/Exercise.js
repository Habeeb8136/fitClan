import React, { useEffect, useRef, useState } from 'react';
import './exercise.css';
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from '../../firebase';
import { Skeleton } from '@mui/material';
import { BsSearch } from 'react-icons/bs';
import ExerciseCard from './ExerciseCard';
import { BiBody } from 'react-icons/bi';
import { CgGym } from 'react-icons/cg';

export default function Exercise() {

  const [exerciseData, setExerciseData] = useState([]);
  const [searchedData, setsearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');
  const [exercise, setExercise] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [suggestedresult, setSuggestedresult] = useState([]);
  const [suggestion, setSuggestion] = useState([]);

  const searchResult = useRef(null)

  useEffect(() => {
    setLoading(true);
    const foodRef = collection(db, "exercise");
    const q = query(foodRef);
    onSnapshot(q, (snapshot) => {
      setExercise(snapshot.docs.map((doc) =>
      ({
        ...doc.data(),
        id: doc.id
      })
      ))
    });
    setInterval(() => {
      setLoading(false);
    }, 3500)
  }, []);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '08cb6b5a23msh61955ac733a6c09p1e5199jsne9f9fedd1c4a',
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

  const handleSuggestions = async (e) => {
    const searchedWord = e.target.value.toLowerCase();
    setWordEntered(searchedWord);
    const filteredExercise = exerciseData.filter(
      (item) => item.name.includes(wordEntered)
      || item.target.includes(wordEntered)
      || item.equipment.includes(wordEntered)
      || item.bodyPart.includes(wordEntered));
    
      searchedWord === "" ? setSuggestion([]) : setSuggestion(filteredExercise);
      console.log('sugg',suggestion)
  };
  

  const handleSearch = () => {
    const filteredData=exerciseData.filter(
      (item) => item.name.includes(wordEntered)
      || item.target.includes(wordEntered)
      || item.equipment.includes(wordEntered)
      || item.bodyPart.includes(wordEntered));
      
              setWordEntered('')
             setsearchedData(filteredData);
             console.log('searcheddata',searchedData)
             console.log('searchedword',wordEntered)
             window.scrollTo({
              top: searchResult.current.offsetTop,
              behavior: 'smooth',
            });
       setSuggestion([])
    };

    const handlesuggestedSearch=(exercise)=>{
      
      const suggestFilter=exerciseData.filter(
        (item) => item.name.includes(exercise.name))
        
        setSuggestedresult(suggestFilter)
        console.log(suggestedresult)
    }

  return (
    <div className='exercise'>
      <h3>Your exercise plan is below:</h3>
      <div className="exercise_outer">
        {
          exercise?.map((item) => (

            <div key={item.id} className="exercise_plans">
              {
                loading
                  ? <Skeleton className='m-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={380} />
                  : <img src={item.backgroundUrl} alt="img" />
              }
              <div className="exercise_plans_container">
                {
                  loading ?
                    <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={35} />
                    : (<h3>{item.title} &nbsp;
                      <small>({item.category})</small>
                    </h3>)
                }
                {
                  loading ?
                    <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={35} />
                    : <a className='btn btn-danger w-100' href={item.pdfUrl} download={true}>Download PDF</a>
                }
                {
                  loading ?
                    <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={75} />
                    : (<p className="goal_plan">
                      {item.details}
                    </p>)
                }
              </div>
            </div>
          ))
        }
      </div>


      <div className='search-exercise'>
      <h2 >Search Exercises For Details</h2>

      
        </div>
      

      <div className='search-results' >
      <div className="searchbar-exercises" ref={searchResult}>
        <div className="searchinput-exercise">
          <input className='input-exercise'
          onKeyPress={(e) => {
                        if (e.key === "Enter"){
                          handleSearch()
                        } }}
           value={wordEntered}
          onChange={handleSuggestions}
          placeholder="Search Exercises/Body part/Target .."
          type="text"
          >
          </input>
          <BsSearch className="searchicon" onClick={handleSearch}/>
        </div>

        <div className='suggestions'>
        {suggestion !== 0 && (
          <div className="suggested-results">
            {suggestion.slice(0, 50).map((exercise, index) => {
              return (
                <div className='suggested-item' key={index} onClick={e=>{
                  handlesuggestedSearch(exercise)
                  
                  
                }}>
                  <div className='item-left'>{exercise.name}</div>

                  <div className='item-right'>
                  <div className='ex-target'><BiBody/>{exercise.target}</div>
                  <div className='ex-equipment'><CgGym />{exercise.equipment}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </div>

        </div>
        {searchedData !== 0 && (
          <ExerciseCard searchedData={searchedData}/>
        )}
     </div>

    </div>
  )
}
