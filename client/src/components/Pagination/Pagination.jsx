import React from "react";
import styles from './Pagination.module.css';

export default function Pagination ({ recipesPerPage, allRecipes, paginado }){
    const pageNumbers= []

    for (let i = 0; i < Math.ceil(allRecipes/recipesPerPage); i++) {
         pageNumbers.push(i+1);
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