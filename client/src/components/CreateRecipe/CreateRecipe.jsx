import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postRecipes, getDiets } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const defaultForm = {
  title: "",
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

export default function CreateRecipe() {
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

    let objError = validate({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(objError);
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

  const handleDelete = (e, el) => {
    e.preventDefault();
    setInput({
        ...input,
        diets : input.diets.filter( ele => ele !== el)
    })
  }

  const handleOnSubmit = async function (e) {
    e.preventDefault();
    dispatch(postRecipes(JSON.stringify(input)));
    setInput(defaultForm);
    alert("Receta creada exitosamente");
    history.push("/home");
  };

  return (
    <div className="main">
      <form className="form" onSubmit={(e) => handleOnSubmit(e)}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Summary: </label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Image url: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>

        <div>
          <label htmlFor="name">HealthScore: </label>
          <input
            type="number"
            min="1"
            max="100"
            value={input.healthScore}
            name="name"
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Steps: </label>
          <textarea
            rows="4"
            cols="50"
            value={input.steps}
            name="name"
            onChange={(e) => handleInputChange(e)}
          ></textarea>
        </div>
        <div
          className=""
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            marginTop: 15,
          }}
        >
          {diets.map((diet) => (
            <label>
              {diet.name}{" "}
              <input
                type="checkbox"
                name={diet.name}
                value={diet.name}
                onChange={(e) => handleCheckDiets(e)}
              />{" "}
            </label>
          ))}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
