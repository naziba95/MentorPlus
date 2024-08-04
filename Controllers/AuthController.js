const MenteeModel = require('../Models/Mentee');
const MentorModel = require('../Models/Mentor');
const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const RegisterMentor = async (req, res) =>
{
    try
    {
        const { FullName, Email, PhoneNumber, Hobbies, Interests, Password, ConfirmPassword } = req.body;

        if (!FullName || !PhoneNumber || !Email)
        {
            return res.status(400).json("All fields are required");
        }

        const existingPhoneNumber = await MentorModel.findOne({ PhoneNumber: PhoneNumber }).exec()
        const existingEmail = await MentorModel.findOne({ Email: Email }).exec()
        if (existingPhoneNumber || existingEmail)
        {
            return res.status(400).json({ message: "Email or phone number already exists" });
        }
        // if (Password !== ConfirmPassword)
        //     {
        //         return res.status(400).json({ message: 'Passwords do not match' });
        //     }
        // Encrypt password
        // const hashedPwd = await bcrypt.hash(Password, 10);
        // // Create new user
        // const newUser = new UserModel({
        //     Email,
        //     Password: hashedPwd,
        //     Role: 'Mentor',
        //     CreatedAt: new Date()
        // });
        // // Save the user to the database
        // const savedUser = await newUser.save();

        const newMentor = new MentorModel({
            FullName,
            PhoneNumber,
            Email,
            Interests,
            Hobbies
        });

        await newMentor.save();

        return res.status(200).json({ message: "Registration successful", newMentor });
    } catch (error)
    {
        console.log(error);
        return res.status(500).json({ message: "an error occurred" });
    }
};

const RegisterMentee = async (req, res) =>
{
    try
    {
        const { FullName, Email, PhoneNumber, Hobbies, Interests, Password, ConfirmPassword } = req.body;

        if (!FullName || !PhoneNumber || !Email)
        {
            return res.status(400).json("All fields are required");
        }

        const existingPhoneNumber = await MenteeModel.findOne({ PhoneNumber: PhoneNumber }).exec()
        const existingEmail = await MenteeModel.findOne({ Email: Email }).exec()
        if (existingPhoneNumber || existingEmail)
        {
            return res.status(400).json({ message: "Email or phone number already exists" });
        }
        // if (Password !== ConfirmPassword)
        //     {
        //         return res.status(400).json({ message: 'Passwords do not match' });
        //     }
        // // Encrypt password
        // const hashedPwd = await bcrypt.hash(Password, 10);
        // // Create new user
        // const newUser = new UserModel({
        //     Email,
        //     Password: hashedPwd,
        //     Role: 'Mentee',
        //     CreatedAt: new Date()
        // });
        // // Save the user to the database
        // const savedUser = await newUser.save();

        const newMentee = new MenteeModel({
            FullName,
            PhoneNumber,
            Email,
            Interests,
            Hobbies
        });

        await newMentee.save();

        return res.status(200).json({ message: "Registration successful", newMentee });
    } catch (error)
    {
        console.log(error);
        return res.status(500).json({ message: "an error occurred" });
    }
};


module.exports = { RegisterMentor, RegisterMentee }