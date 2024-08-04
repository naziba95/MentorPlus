const express = require('express');
const router = express.Router();
const { AssignMentor, FetchMentorByPhoneNo, GetAllMentors, GetMenteesByMentorPhoneNo } = require('../Controllers/MappingController')


router.post('/AssignMentor/:menteeId', AssignMentor);
router.get('/FetchMentorByPhone', FetchMentorByPhoneNo);
router.get('/GetAllMentors', GetAllMentors);
router.get('/GetMenteesByPhone', GetMenteesByMentorPhoneNo);

module.exports = router;