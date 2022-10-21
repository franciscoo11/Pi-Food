import React from 'react';
import styles from '../Pagination/Pagination.module.css';

export default function Pagination ({recipesPerPage, allRecipes, paginado, prev, next, currentPage}){
    const pageNumbers = []

    for( let i=1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)     
    }

    return(
        <nav>
            <li className={styles.paginado}>
                <button className={styles.buttonPaginado} onClick={prev}>{'◅◅'}</button>
                {pageNumbers &&
                pageNumbers.map(number =>(
                    <ul key={number} className={styles.active}>
                    <button id={currentPage === number ? styles.borderActualPage : null} onClick={() => paginado(number)} className={styles.buttonPaginado} >{number}</button>
                    </ul>
                ))}
                <button style={{marginLeft: '35px'}} className={styles.buttonPaginado} onClick={next}>{'▻▻'}</button>
            </li>
        </nav>
    )
}