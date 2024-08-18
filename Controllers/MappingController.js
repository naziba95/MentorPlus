const MenteeModel = require('../Models/Mentee');
const MentorModel = require('../Models/Mentor')

const AssignMentor = async (req, res) => 
{
    try
    {
        const { menteeId } = req.params;
        const { mentorId } = req.body;

        const mentee = await MenteeModel.findById(menteeId);
        if (mentee == null)
        {
            return res.status(400).json({ message: "Mentee Id not valid" })
        }

        const mentor = await MentorModel.findById(mentorId);
        if (mentor == null)
        {
            return res.status(400).json({ message: "Mentor Id not valid" })
        }

        //Update mentor field in mentee with mentor Id provided
        mentee.Mentor = mentor._id
        await mentee.save();
        return res.status(200).json({ message: "success", mentee })

    }
    catch (error)
    {
        console.error(error)
        return res.status(500).json({ message: "An error occurred" })
    }
}

const FetchMentorByPhoneNo = async (req, res) => 
{
    try
    {
        const { PhoneNo } = req.query;
        const mentee = await MenteeModel.findOne({ PhoneNumber: PhoneNo }).populate('Mentor');
        if (mentee == null)
        {
            return res.status(400).json({ message: "No mentor found for this phone number" })
        }
        console.log(mentee);
        const mentorId = mentee.Mentor._id;
        const mentorDetails = await MentorModel.findById(mentorId)
        if (mentorDetails == null)
        {
            return res.status(400).json({ message: "No mentor found" })
        }

        return res.status(200).json({ message: "Mentor found", mentorDetails })
    }
    catch (error)
    {
        console.error(error)
        return res.status(500).json({ message: "An error occurred" })
    }
}


const GetAllMentors = async (req, res) => 
{
    try
    {

        const mentor = await MentorModel.find()
        if (mentor == null)
        {
            return res.status(400).json({ message: "No mentors found" })
        }


        return res.status(200).json({ message: "Mentors found", mentor })
    }
    catch (error)
    {
        console.error(error)
        return res.status(500).json({ message: "An error occurred" })
    }
}

const GetMenteesByMentorPhoneNo = async (req, res) => 
{
    try
    {
        const { PhoneNo } = req.query;
        const mentor = await MentorModel.findOne({ PhoneNumber: PhoneNo })
        if (mentor == null)
        {
            return res.status(400).json({ message: "No mentor found" })
        }
        const mentorId = mentor._id;
        const mentees = await MenteeModel.find({ Mentor: mentorId })
        if (mentees == null)
        {
            return res.status(400).json({ message: "No mentees found" })
        }

        return res.status(200).json({ message: "Mentors found", mentees })
    }
    catch (error)
    {
        console.error(error)
        return res.status(500).json({ message: "An error occurred" })
    }
}

const FetchMenteeByPhoneNo = async (req, res) => 
{
    try
    {
        const { PhoneNo } = req.query;
        const mentee = await MenteeModel.findOne({ PhoneNumber: PhoneNo })
        if (mentee == null)
        {
            return res.status(400).json({ message: "No mentor found" })
        }
        return res.status(200).json({ message: "mentee found", mentee })
    }
    catch (error)
    {
        console.error(error)
        return res.status(500).json({ message: "An error occurred" })
    }
}

const GetMentorByMentorPhone = async (req, res) => 
{
    try
    {
        const { PhoneNo } = req.query;
        const mentor = await MentorModel.findOne({ PhoneNumber: PhoneNo })
        if (mentor == null)
        {
            return res.status(400).json({ message: "No mentor found" })
        }
        return res.status(200).json({ message: "mentor found", mentor })
    }
    catch (error)
    {
        console.error(error)
        return res.status(500).json({ message: "An error occurred" })
    }
}


module.exports = { AssignMentor, FetchMentorByPhoneNo, GetAllMentors, GetMenteesByMentorPhoneNo, FetchMenteeByPhoneNo, GetMentorByMentorPhone }