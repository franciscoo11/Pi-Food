import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { getRecipeDetail, resetDetail, removeRecipe } from '../../actions'
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
    dispatch(removeRecipe(idRecipe));
    alert('Recipe has been remove')
    history.push("/home")
    window.location.reload()
  }

  return (
    <div>
      {recipe.image ? (
        <div className={styles.div} style={{ marginTop: "80px" }}>
          <div>
            <h1 className={styles.titulodetail}>{recipe.name}</h1>
          </div>
          <div>
            <img
              src={
                recipe.image ? recipe.image : "not pic" //upload img default when imgs is empty
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
        <div>
          <h2>Loading..</h2>
        </div>
      )}
      {
        recipe.fromDb ? (<button className={styles.btn2} style={{position: 'absolute', right: '7%', top: '10%', color: '#fff', borderRadius: '15px', width: '45px', height: '50px'}} onClick={handlerRecipeDelete}>X</button>) : null
      }
      
      <Link to="/home">
        <button className={styles.btn5} style={{display: !recipe.image ? 'none' : 'inline-block'}}>Back to home</button>
      </Link>
    </div>
  );
}
