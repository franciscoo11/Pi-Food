const { Router } = require('express');
const db = require("../db");
const { Diet } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    let typesDiets = await Diet.findAll();
    if(!typesDiets.length){
      const allDiets = [
        { name: "gluten free" },
        { name: "ketogenic" },
        { name: "vegetarian" },
        { name: "lacto vegetarian" },
        { name: "lacto ovo vegetarian" },
        { name: "ovo vegetarian" },
        { name: "vegan" },
        { name: "pescatarian" },
        { name: "paleolithic" },
        { name: "primal" },
        { name: "low fodmap" },
        { name: "whole 30" },
      ];
      typesDiets = await Diet.bulkCreate(allDiets)
    }
    return res.status(200).json(typesDiets)
  } catch (error) {
    res.status(404).send('Diet type not founded.')
  }
    
})

module.exports = router;