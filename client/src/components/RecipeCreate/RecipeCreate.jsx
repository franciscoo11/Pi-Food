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
  if (!input.name) {
    errors.name = "Title is required";
  }
  if (!input.summary) {
    errors.summary = "Summary is required";
  }
  if (!/^[1-9][0-9]?$|^100$/g.test(input.healthScore)) {
    errors.healthScore =
      "Health Score is required and must be in a range from 1 - 100";
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

//   const handleDelete = (e, el) => {
//     e.preventDefault();
//     setInput({
//         ...input,
//         diets : input.diets.filter( ele => ele !== el)
//     })
//   }

  const handleOnSubmit = async function (e) {
    e.preventDefault();
    dispatch(postRecipes(input));
    setInput(defaultForm);
    alert("Receta creada exitosamente");
    history.push("/home");
  };

  return (
    diets.length ?
    <div className={styles.mainContainer}>
      <form className={styles.form} onSubmit={(e) => handleOnSubmit(e)}>
        <div>
            <h2>Create Recipe</h2>
        </div>
        <div>
          <label className={styles.lbl} htmlFor="name">Name: </label>
          <input
            className={styles.inpt}
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
            required
          />
          {errors.name && <p className="red">{errors.name}</p>}
        </div>

        <div>
          <label className={styles.lbl} htmlFor="summary">Summary: </label>
          <input
            className={styles.inpt}
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleInputChange(e)}
            required
          />
          {errors.summary && <p className="red">{errors.summary}</p>}
        </div>

        <div>
          <label className={styles.lbl} htmlFor="image">Image url: </label>
          <input
            className={styles.inpt}
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div>
          <label className={styles.lbl} htmlFor="healthScore">HealthScore: </label>
          <input
            className={styles.inpt}
            type="number"
            min="1"
            max="100"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleInputChange(e)}
            required
          />
          {errors.healthScore && <p className="red">{errors.healthScore}</p>}
        </div>

        <div>
          <label className={styles.lbl} htmlFor="steps">Steps: </label>
          <textarea
            className={styles.textArea}
            rows="4"
            cols="50"
            value={input.steps}
            name="steps"
            onChange={(e) => handleInputChange(e)}
          ></textarea>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr",
            marginTop: 15,
            marginLeft: '65px'
          }}
        >
          {diets.map((diet) => (
            <label className={styles.lbl}>
              {diet.name}{" "}
              <input
                className={styles.inpt}
                type="checkbox"
                name={diet.name}
                value={diet.name}
                onChange={(e) => handleCheckDiets(e)}
              />{" "}
            </label>
          ))}
        </div>
        <button className={styles.btn5} type="submit">Create</button>
      </form>
    </div> : <p>Loading..</p>
  );
}