import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { getRecipeDetail, resetDetail, removeRecipe } from '../../actions'
import Loading from '../Loading/Loading';
import styles from "../RecipeDetail/RecipeDetail.module.css";


export default function RecipeDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { idRecipe } = useParams();
  const recipe = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getRecipeDetail(idRecipe));
    return () => {
      dispatch(resetDetail())
    };
  }, [dispatch,idRecipe]);


  const handlerRecipeDelete = () => {
    if(window.confirm('Are you sure with keep forward?')){
      dispatch(removeRecipe(idRecipe));
      alert('Recipe has been remove')
      history.push("/home")
      window.location.reload()
    }
  }

  return (
    <div>
      {recipe.length !== 0 ? (
        <div className={styles.div} style={{ marginTop: "80px" }}>
          <div>
            <h1 className={styles.titulodetail}>{recipe.name}</h1>
          </div>
          <div>
            <img
              src={
                recipe.image ? recipe.image : 'https://i.ibb.co/Ykth1KM/icono-1-1.png' //upload img default when imgs is empty
              }
              alt="recipe plate"
            />
          </div>
          <div className={styles.detalles}>
            <h3>Diets:</h3>
            <h4>{ recipe.diets[0].name ? recipe.diets.map(d => d.name).join(', ') : recipe.diets.join(', ') }
            </h4>
            <br />
            <h3>Description of the plate: </h3>
            <h4
              dangerouslySetInnerHTML={{ __html: recipe.summary }} //replace(/<[^>]*>?/g, "")
            />
            <br></br>

            <h3>Step by step: </h3>
            <h4>
              {!recipe.steps ? 
                "No incluye instrucciones"
                : recipe.steps}
            </h4>
            <br></br>
            <h3>Level health: </h3>
            <h4>{recipe.healthScore}</h4>
          </div>
        </div>
        
      ) : (
        <div style={{position: 'absolute', left: '50%', top: '50%'}}><Loading /></div>
      )}
      {
        recipe.fromDb ? (
          <div>
            <button className={styles.btn2} style={{position: 'absolute', right: '7%', top: '10%', color: '#fff', borderRadius: '15px', width: '45px', height: '50px'}} onClick={handlerRecipeDelete}>X</button>
            <Link to={`/updateRecipe/${idRecipe}`}>
              <button className={styles.btnEdit} style={{position: 'absolute', right: '12%', top: '10%', height: '50px', borderRadius: '999px', color:'#fff'}}>Edit</button>
            </Link>
          </div>) : null
      }
      
      <Link to="/home">
        <button className={styles.btn5} style={{display: !recipe.image ? 'none' : 'inline-block'}}>Back to home</button>
      </Link>
    </div>
  );
}
