import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeDetail, resetDetail } from '../../actions'
import styles from "../RecipeDetail/RecipeDetail.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { idRecipe } = useParams();
  const recipe = useSelector((state) => state.detail);

  useEffect(() => {
    console.log('ENTRE, ACTUALIZE, SALGO')
    dispatch(getRecipeDetail(idRecipe));
    // return dispatch(resetDetail());
  }, [dispatch,idRecipe]);
  
  console.log(recipe)
  return (
    <div>
      {recipe.length? (
        <div className={styles.div}>
          <div>
            <h1 className={styles.titulodetail}>{recipe[0].name}</h1>
          </div>
          <div>
            <img
              src={
                recipe[0].image
                  ? recipe[0].image
                  : 'not pic' //upload img default when imgs is empty
              }
              alt='recipe plate'
            />
          </div>
          <div className={styles.detalles}>
            <h3>Description of the plate: </h3>
            <h4
              dangerouslySetInnerHTML={{ __html: recipe[0].summary }} //replace(/<[^>]*>?/g, "")
            />
            <br></br>

            <h3>Step by step: </h3>
            <h4>
              {recipe[0].steps.length
                ? recipe[0].steps
                : "No incluye instrucciones"}
            </h4>
            <br></br>
            <h3>Level health: </h3>
            <h4>{recipe[0].healthScore}</h4>
          </div>
        </div>
      ) : (
        <div>
          <h2>Loading..</h2>
        </div>
      )}

      <Link to="/home">
        <button className="btn5">Back to home</button>
      </Link>
    </div>
  );
}
