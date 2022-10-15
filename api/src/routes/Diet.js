const { Router } = require('express');
const { getAllDiets } = require('../controllers/DietController')

const router = Router();

router.get('/', getAllDiets)

module.exports = router;