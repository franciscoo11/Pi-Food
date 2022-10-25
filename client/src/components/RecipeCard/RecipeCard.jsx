import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../RecipeCard/RecipeCard.module.css'

export default function RecipeCard({
  id,
  image,
  name,
  typeDiets,
  healthScore,
}) {
  return (
    <div style={{ margin: 10 }}>
      <div
        style={{ width: 330, height: 380, padding: 10 }}
        className={styles.recipecard}
      >
        <div>
          <Link to={`/recipes/detail/${id}`}>
            <img
              className={styles.img}
              src={image}
              width="180px"
              haight="180px"
              alt="recipe pic"
            />
            <h1>{name}</h1>
            <h3> Type diet: {typeDiets}</h3>
            <h3> Health Score: {healthScore}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}