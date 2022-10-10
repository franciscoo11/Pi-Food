const { Router } = require("express");
const { getDiets } = require("../controllers/TypeDietController");

const router = Router();

router.get("/types", async(req,res) => {
    try {
        const alltypeDiets = await getDiets(res);
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;