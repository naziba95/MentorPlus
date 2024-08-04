const express = require('express');
const router = express.Router();
const { AssignMentor, FetchMentorByPhoneNo } = require('../Controllers/MappingController')


router.post('/AssignMentor/:menteeId', AssignMentor);
router.get('/FetchMentorByPhone', FetchMentorByPhoneNo);

module.exports = router;