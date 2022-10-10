const { Router } = require("express");
const { getDiets } = require("../controllers/TypeDietController");

const router = Router();

router.get("/types", async(req,res) => {
    try {
        getDiets(res);
    } catch (error) {
        res.status(500).json( {error: 'Algo salio mal al cargar los tipos de dietas..'} )
    }
})

module.exports = router;