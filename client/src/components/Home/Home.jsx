import React from 'react';
 import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../actions';



export default function Home() {
  const dispatch = useDispatch();
  // const allRecipes = useSelector(state => state.recipes);
  
  useEffect(()=>{
    dispatch(getRecipes())
  }, [dispatch]);


  function handleReset(e){
    e.preventDefault()
    dispatch(getRecipes())
  }
  return (
    <div>
      <h1>Recetas</h1>
      <button onClick={e => {handleReset(e)}}>RELOAD RECIPES</button>
    </div>
  )
}

