import React from 'react';
import styles from '../Pagination/Pagination.module.css';

export default function Pagination ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for( let i=1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)     
    }

    return(
        <nav>
            <li className={styles.paginado}>
                {pageNumbers &&
                pageNumbers.map(number =>(
                    <ul key={number} className={styles.active}>
                    <button onClick={() => paginado(number)} className={styles.buttonPaginado} >{number}</button>
                    </ul>
                ))}
            </li>
        </nav>
    )
}