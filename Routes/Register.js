const express = require('express');
const router = express.Router();
const { RegisterMentee, RegisterMentor } = require('../Controllers/AuthController')

// Register mentor/mentee
router.post('/Register/mentor', RegisterMentor);
router.post('/Register/mentee', RegisterMentee);

module.exports = router;