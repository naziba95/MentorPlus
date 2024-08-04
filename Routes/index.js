const express = require('express');
const router = express.Router();


const RegisterRoute = require('../Routes/Register')
const MappingRoute = require('../Routes/Mapping')

router.use('/Auth', RegisterRoute)
router.use('/Mapping', MappingRoute)


module.exports = router;