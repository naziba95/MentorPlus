const express = require('express');
const router = express.Router();
const { AssignMentor, FetchMentorByPhoneNo, GetAllMentors, GetMenteesByMentorPhoneNo, FetchMenteeByPhoneNo, GetMentorByMentorPhone } = require('../Controllers/MappingController')


router.post('/AssignMentor/:menteeId', AssignMentor);
router.get('/FetchMentorByPhone', FetchMentorByPhoneNo);
router.get('/GetAllMentors', GetAllMentors);
router.get('/GetMenteesByPhone', GetMenteesByMentorPhoneNo);
router.get('/FetchMenteeByPhone', FetchMenteeByPhoneNo);
router.get('/GetMentorByMentorPhone', GetMentorByMentorPhone);

module.exports = router;