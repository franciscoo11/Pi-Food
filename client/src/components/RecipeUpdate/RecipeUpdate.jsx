import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getDiets } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../Loading/Loading';
import styles from './RecipeUpdate.module.css';
import axios from "axios";

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

export default function RecipeUpdate() {
  const [input, setInput] = useState(defaultForm);
  const { idRecipe } = useParams();
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
      setInput(({ ...input, diets: [...input.diets, e.target.value] }));
    }
    else {
      setInput({
        ...input,
        diets: input.diets.filter((d) => d.name !== e.target.value) 
      })
    }
  }

  const handleOnSubmit = function (e) {
    e.preventDefault();
    if(!errors.name && input.name && !errors.healthScore && input.healthScore && !errors.summary && input.summary){

      axios.put(
        'http://localhost:3001/recipes/update/' +idRecipe, input
      )
      .then(response => {
        alert("Recipe has been updated!");
        setInput(defaultForm);
        history.push("/home");
        document.location.reload();
      })
      .catch(() => alert('Ups..error has been present please try again'))
    }
    else {
      alert('Something goes wrong check the form')
    }
  };

  return (
    diets.length ?
    <div>
      <Link to='/home'>
        <button className={styles.btn2} style={{position: 'absolute', left: '550px', top: '350px', width:'100px'}}>BACK</button>
      </Link>
      
      <h1 className={styles.titulo}>Update Recipe</h1>
      <div className={styles.container}>

      <form className={styles.form} onSubmit={(e) => handleOnSubmit(e)}>

          <div>
            <label style={{marginLeft: '34%'}} htmlFor="name">Name: </label>
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
          <label style={{marginLeft: '34%'}} htmlFor="summary">Summary: </label>
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
          <label style={{marginLeft: '34%'}} htmlFor="image">Image url: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleInputChange(e)}
          />
          </div>
      
          <div>
          <label style={{marginLeft: '34%'}} htmlFor="healthScore">HealthScore: </label>
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
          <label style={{marginLeft: '34%'}} htmlFor="steps">Steps: </label>
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

        <button className={styles.btn2} type="submit">Update</button>
      </form>

      </div>
    </div> : <div style={{position: 'absolute', left: '50%', top: '50%'}}><Loading /></div>
  );
}