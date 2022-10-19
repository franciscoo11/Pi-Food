import React from 'react';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, orderByName, filterByDiet, orderByHealthScore, filterByCreated } from '../../actions';
import { Link} from 'react-router-dom';
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

const next = () => {
    let lastpage = Math.ceil(allRecipes.length / recipesPerPage);
    if(currentPage < lastpage) setCurrentPage(currentPage + 1)
}

const prev = () => {
    if(currentPage > 1){
        setCurrentPage(currentPage - 1)
    }
}

const handleFilterDb = (e) => {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value))
    setCurrentPage(1);
    setOrden(`Order ${e.target.value}`)
}
const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Order ${e.target.value}`)
}

const handleSortScore = (e) => {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value))
    setCurrentPage(1);
    setOrden(`Order ${e.target.value}`)
}

const handleFilterDiets = (e) => {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value))
    setCurrentPage(1)
    setOrden(`Order ${e.target.value}`)
}

return(
    <div>
        <div>
            <div style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows:'1fr', }}>
                
                <h1 className={styles.tituloHome} style={{gridColumn: '1', gridRow: '1'}}>Amazing food!</h1>

                <Link to = '/buildrecipe' >
                    <button className={styles.btn} style={{marginRight: '150px'}}>Add recipe</button>     
                </Link>
                <button className={styles.btn} style={{gridColumn: '3', gridRow: '1', marginRight: '16px'}} onClick={() => window.location.reload()}>Refresh</button>
        </div>
        <div style={{display:'inline-block', alignItems:'center', width:'60%', marginLeft:'150px', marginTop:"50px"}}>
        <div className={styles.contenedorFiltros} style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gridTemplateRows:'1fr', gap:'140px'}}>
            <div className={styles.puntuacion} style={{display:'grid', gridTemplateColumns: '1fr', gridTemplateRows:'1fr'}}>
                <label className={styles.lbpuntuacion} style={{marginLeft: '19px'}}>Order by healthScore</label>
                <select className={styles.btn} onClick={e => handleSortScore(e)}>
                    <option>Click me ⇩</option>
                    <option value = 'asc' >0-100</option>
                    <option value = 'desc'>100-0</option>
                </select>
            </div>
            <div className={styles.alfabeticamente} style={{display:'grid', gridTemplateColumns: '1fr', gridTemplateRows:'1fr'}}>
                <label className={styles.lbpuntuacion} style={{marginLeft: '19px'}}>Order A-Z</label>
                <select className={styles.btn} onClick={e => handleSort(e)}>
                    <option>Click me ⇩</option>
                    <option value = 'asc'>A-Z</option>
                    <option value = 'desc'>Z-A</option>
                </select>
            </div>
            <div className={styles.fromapiordb} style={{display:'grid', gridTemplateColumns: '1fr', gridTemplateRows:'1fr'}}>
                <label  style={{width:'45%', marginLeft:'48px'}} className={styles.lbpuntuacion}>API-DB</label>
                <select style={{marginLeft:'30px'}} className={styles.btn} onClick={e => handleFilterDb(e)}>
                    <option>Click me ⇩</option>
                    <option value = 'db'>DB</option>
                    <option value = 'api'>API</option>
                </select>
            </div>
            <div className={styles.recetas} style={{display:'grid', gridTemplateColumns: '1fr', gridTemplateRows:'1fr'}}>
            <label style={{marginLeft: '15px'}} className={styles.lbdiets}>Filter by Diets</label>
            <select className={styles.btn} onChange={e => handleFilterDiets(e)}>
                <option value ='all'>All</option>
                <option value ='vegetarian'>Vegetarian</option>
                <option value ='vegan'>Vegan</option>
                <option value ='lacto ovo vegetarian'>Ovo vegetarian</option>
                <option value ='gluten free'>Gluten free </option>
                <option value ='dairy free'>Dairy free </option>
                <option value ='pescatarian'>Pescatarian </option>
                <option value ='paleolithic'>Paleolithic </option>
                <option value ='primal'>Primal </option>
                <option value ='ketogenic'>Ketogenic </option>
                <option value ='whole 30'>Whole 30 </option>
                <option value ='fodmap friendly'>Fodmap friendly </option>
            </select>
            </div>
            </div>
            </div>
            <div style={{marginTop: '25px'}}>
                    <SearchBar />
            </div> 
            <Pagination
            recipesPerPage= {recipesPerPage}
            allRecipes={allRecipes.length}
            paginado= {paginado} 
            currentPage = {currentPage}
            next={next}
            prev={prev}/>
        <div className={styles.containerCard}>
         
         { !currentRecipes.length ? <p style={{ color: '#fff'}}> No se encontraron recetas.. </p> :
           currentRecipes?.map( e =>{
            
            let formatDiets = function() {
            let aux = [];
            if(e.diets.length <= 0) return aux = "Diets are empty.";
            if(!e.diets[0].name){
                aux = e.diets;
                return aux.join(", ");
            }
            aux = e.diets.map(el =>  el.name)
            return aux.join(", ");
            
        }
            return (
               <div key={e.id}  className={styles.card}>
                    
                   <RecipeCard id={e.id} image={ e.image ? e.image : 'https://i.ibb.co/Ykth1KM/icono-1-1.png' } name={e.name} tipoDeDieta={formatDiets()} puntuacion={e.healthScore} />
                   
                   </div>
                   )
           })
        }
        </div>
        <Pagination
            recipesPerPage= {recipesPerPage}
            allRecipes={allRecipes.length}
            paginado= {paginado} 
            currentPage = {currentPage}
            next={next}
            prev={prev}/>
        </div> 
    </div>
    )
}