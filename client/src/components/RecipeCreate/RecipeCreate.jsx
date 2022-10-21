import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipes, getDiets } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './RecipeCreate.module.css';

const defaultForm = {
  name: "",
  summary: "",
  healthScore: 0,
  diets: [],
  image: "",
  steps: "",
};

export function validate(input) {
  let errors = {};
  if (!input.name.trim()) {
    errors.name = "Title is required";
  }
  if (!input.summary.trim()) {
    errors.summary = "Summary is required";
  }
  if (!/^[1-9][0-9]?$|^100$/g.test(input.healthScore)) {
    errors.healthScore = "Health Score is required and must be between 1 - 100";
  }
  return errors;
}

export default function RecipeCreate() {
  const [input, setInput] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleInputChange = function (e) {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    let temporalObj = validate({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(temporalObj);
  };

  function handleCheckDiets(e) {
    if (e.target.checked) {
      setInput((prev) => ({ ...prev, diets: [...prev.diets, e.target.value] }));
    } else {
      setInput((prev) => ({
        ...prev,
        diets: [...prev.diets].filter((diet) => e.target.value !== diet.name),
      }));
    }
  }

  const handleOnSubmit = function (e) {
    e.preventDefault();
    dispatch(postRecipes(input));
    setInput(defaultForm);
    alert("Receta creada exitosamente");
    history.push("/home");
  };

  return (
    diets.length ?
    <div>
      <Link to='/home'>
        <button className={styles.btn2} style={{position: 'absolute', left: '550px', top: '350px', width:'100px'}}>BACK</button>
      </Link>
      
      <h1 className={styles.titulo}>Create Recipe</h1>
      <div className={styles.container}>

      <form className={styles.form} onSubmit={(e) => handleOnSubmit(e)}>

          <div>
            <label htmlFor="name">Name: </label>
            <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
            required
            />
            {errors.name && <p className={styles.danger}>{errors.name}</p>}
          </div>
        
          <div>
          <label htmlFor="summary">Summary: </label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleInputChange(e)}
            required
          />
          {errors.summary && <p className={styles.danger}>{errors.summary}</p>}
          </div>

          <div>
          <label htmlFor="image">Image url: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleInputChange(e)}
          />
          </div>
      
          <div>
          <label htmlFor="healthScore">HealthScore: </label>
          <input
            type="number"
            min="1"
            max="100"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleInputChange(e)}
            required
          />
          {errors.healthScore && <p className={styles.danger}>{errors.healthScore}</p>}
          </div>
        
          <div>
          <label htmlFor="steps">Steps: </label>
          <textarea
            rows="4"
            cols="50"
            value={input.steps}
            name="steps"
            onChange={(e) => handleInputChange(e)}
          ></textarea>
          </div>

           <div className={styles.check} style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows:'1fr 1fr 1fr', marginTop:'15px'}}>
              {
                diets.map(diet => (
                  <label key={diet.name}>{diet.name} <input type='checkbox' name={diet.name} value={diet.name} onChange={e => handleCheckDiets(e)}/></label>
                ))
              }
          </div>

        <button className={styles.btn2} type="submit">Create</button>
      </form>


      </div>
    </div> : <p>Loading..</p>
  );
}