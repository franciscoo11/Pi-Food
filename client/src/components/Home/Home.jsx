import React from 'react';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, orderByName, filterByDiet, orderByHealthScore} from '../../actions';
import {Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import styles from '../Home/Home.module.css';

export default function Home(){

const dispatch = useDispatch()
const allRecipes = useSelector ((state) => state.allRecipes)
const [orden, setOrden] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [recipesPerPage, setRecipesPerPage] = useState(9)
const indexLastRecipe = currentPage * recipesPerPage
const indexFirstRecipe = indexLastRecipe - recipesPerPage
const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect(() =>{
    dispatch(getAllRecipes())
},[dispatch])

function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Order ${e.target.value}`)
}
function handleSortScore(e){
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value))
    setCurrentPage(1);
    setOrden(`Order ${e.target.value}`)
}

function handleFilterDiets(e){
    e.preventDefault();
    dispatch(filterByDiet(e.target.value))
    setCurrentPage(1)
    setOrden(`Order ${e.target.value}`)
}
return(
    <div >
        <div>
            <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows:'1fr', }}>
                <h1 className={styles.tituloHome}>Amazing food!</h1>
        
            <Link to = '/buildrecipe'>
                <button className={styles.btn}> Add recipe </button>            
            </Link>
            {/* <Link to = '#'>
                <button className={styles.btn}> Reset </button>            
            </Link>     */}
        </div>
        <div style={{display:'inline-block', alignItems:'center', width:'60%', marginLeft:'150px', marginTop:"50px"}}>
        <div className={styles.contenedorFiltros} style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows:'1fr'}}>
            <div className={styles.puntuacion} style={{display:'grid', gridTemplateColumns: '1fr', gridTemplateRows:'1fr', }}>
                <label className={styles.lbpuntuacion} style={{marginLeft: '19px'}}>Order by healthScore</label>
                <select className={styles.btn} onClick={e => {handleSortScore(e)}}>
                    <option value = 'min' >0-100</option>
                    <option value = 'may'>100-0</option>
                </select>
            </div>
            <div className={styles.alfabeticamente} style={{display:'grid', gridTemplateColumns: '1fr', gridTemplateRows:'1fr', }}>
                <label className={styles.lbpuntuacion} style={{marginLeft: '19px'}}>Order A-Z</label>
                <select className={styles.btn} onClick={e => {handleSort(e)}}>
                    <option value = 'asc' >A-Z</option>
                    <option value = 'desc'>Z-A</option>
                </select>
            </div>
            <div className={styles.recetas} style={{display:'grid', gridTemplateColumns: '1fr', gridTemplateRows:'1fr', }}>
            <label style={{marginLeft: '15px'}}>Filter by Diets</label>
            <select className={styles.btn} onChange={e => handleFilterDiets(e)}>
                <option value ='todas'>Todas</option>
                <option value ='vegetarian'>Vegetarian</option>
                <option value ='vegan'>Vegan</option>
                <option value ='lacto ovo vegetarian'>Ovo vegetarian</option>
                <option value ='gluten free'>Gluten free </option>
                <option value ='dairy free'>Dairy free </option>
                <option value ='pescatarian'>Pescatarian </option>
                <option value ='paleolithic'>Paleolithic </option>
                <option value ='primal'>Primal </option>
                <option value ='low fodmap'>Low fodmap </option>
                <option value ='whole 30'>Whole 30 </option>
            </select>
            </div>
            </div>
            </div>
            <div style={{marginTop: '35px'}}>
                <SearchBar/>
            </div>
            
            <Pagination
            recipesPerPage= {recipesPerPage}
            allRecipes={allRecipes.length}
            paginado= {paginado} />
        <div className={styles.containerCard}>
         
         { !currentRecipes.length ? <p> Loading.. </p> :
           currentRecipes?.map( e =>{
            
            let formatDietsToStr = function() {
            let aux = [];
            if(e.diets.length <= 0) return aux = "Diets are empty.";
            if(e.diets[0].name){
            aux = e.diets.map(el => {
            return el.name
            })
            return aux.join(", ");
            }
            else{ 
            aux = e.diets;
            return aux.join(", ");
           } 
           
        }   
        
            return (
               <div key={e.id}  className={styles.card}>
                    
                   <RecipeCard id={e.id} image={e.image} name={e.name} tipoDeDieta={formatDietsToStr()} puntuacion={e.healthScore}/>
                   
                   </div>
                   )
           })
        }
        </div>
         </div> 
    </div>
    )
}