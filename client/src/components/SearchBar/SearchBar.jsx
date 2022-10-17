import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeSearch } from "../../actions";
import styles from '../SearchBar/SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name,setName] = useState('')

    const handleInput = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getRecipeSearch(name))
        setName('');
    }
    return (
        <div>
            <input
            className={styles.searchInput}
            id="searchInput"
            type = 'text'
            autoComplete="off"
            placeholder = 'Search your plate...'
            value={name}
            onChange = {handleInput}
            />
            <button className={styles.btn1} type='submit' onClick={handleSubmit}>Search</button>
        </div>
    )
}