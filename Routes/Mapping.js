const express = require('express');
const router = express.Router();
const { AssignMentor, FetchMentorByPhoneNo, GetAllMentors } = require('../Controllers/MappingController')


router.post('/AssignMentor/:menteeId', AssignMentor);
router.get('/FetchMentorByPhone', FetchMentorByPhoneNo);
router.get('/GetAllMentors', GetAllMentors);

module.exports = router;