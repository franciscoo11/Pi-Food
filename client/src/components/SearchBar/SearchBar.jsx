import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeSearch } from "../../actions";
import styles from '../SearchBar/SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name,setName] = useState('')

    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getRecipeSearch(name))
        setName('');
    }
    return (
        <div>
            <input
            type = 'text'
            placeholder = 'Find your plate...'
            onChange = {(e) => handleInput(e)}
            />
            <button className={styles.btn1} type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}