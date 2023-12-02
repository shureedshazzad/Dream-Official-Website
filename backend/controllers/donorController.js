
import { error } from "console";
import asyncHandler from "../middleware/asyncHandler.js";
import Donor from "../models/donorModel.js";
import PublicBloodReq from "../models/publicBloodReqModel.js";
import generateToken from "../utils/generateToken.js";
import TelegramBot from "node-telegram-bot-api";
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';







//@desc Auth Donor and get Token
//@route POST/api/donors/login
//@access Public


const authDonor = asyncHandler(async (req,res) =>{
  
  const { email, password } = req.body;

  const donor = await Donor.findOne({email});
  if(donor && (await donor.matchPassword(password))){

    generateToken(res, donor._id);
   
    res.status(200).json({
      _id: donor._id,
      name: donor.name,
      dept: donor.dept,
      batch: donor.batch,
      email: donor.email,
      phoneNumber:donor.phoneNumber,
      bloodType:donor.bloodType,
      donations:donor.donations,
      lastDonationDate:donor.lastDonationDate,
      currentLocation:donor.currentLocation,
      isAdmin:donor.isAdmin,
      isCommitteeMember:donor.isCommitteeMember,
      committeePost:donor.committeePost,
      committeeImage:donor.committeeImage,
      
    });
  }
  else{
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

//@desc Register Donor
//@route POST/api/donors
//@access Public


const registerDonor = asyncHandler(async (req,res) =>{

  const{ name,dept,batch,email,phoneNumber,bloodType,currentLocation,donations,lastDonationDate,password} =req.body;
  const donorExits = await Donor.findOne({email});
  if(donorExits){
    res.status(400);
    throw new Error('Donor already exists');
  }

  let isAdmin = false;

  if (email === 'shazzad1907100@stud.kuet.ac.bd') {
    isAdmin = true;
  }


  const donor =await Donor.create(
    {
      name,
      dept,
      batch,
      email,
      phoneNumber,
      bloodType,
      currentLocation,
      donations,
      lastDonationDate,
      password,
      isAdmin,
    }
  );
  if(donor)
  {

    // Send an email to the registered donor
    const config = {
      service: 'gmail',
      auth: {
        user: 'shureedshazzad534@gmail.com',
        pass: 'biok spxm bknr ufnc',
      },
    };

    const transporter = nodemailer.createTransport(config);


    const MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Dream Family',
        link: 'https://mailgen.js/',
      },
    });


    const response = {
      body: {
        name: donor.name,
        intro: 'Congratulations! You have become a member of our Dream family.',
      },
      outro: 'Look forward to doing more with you.',
    };


    const mail = MailGenerator.generate(response);

    
    const message = {
      from: 'shureedshazzad534@gmail.com',
      to:donor.email,
      subject: 'Dream Registration',
      html: mail,
    }

    transporter.sendMail(message).then(() => {
      generateToken(res, donor._id);
      res.status(201).json({
        _id: donor._id,
        name: donor.name,
        dept: donor.dept,
        batch: donor.batch,
        email: donor.email,
        phoneNumber: donor.phoneNumber,
        bloodType: donor.bloodType,
        donations: donor.donations,
        lastDonationDate: donor.lastDonationDate,
        isAdmin: donor.isAdmin,
        currentLocation:donor.currentLocation,
        isCommitteeMember: donor.isCommitteeMember,
        committeePost: donor.committeePost,
        committeeImage: donor.committeeImage,
        message: 'You should receive an email with registration confirmation.',
      });
    }).catch((error) => {
      res.status(500).json({ error });
    });
  } else{
    res.status(400);
    throw new Error ('Invalid user data');
  }

});



 



//@desc Log out Donor and clear cookies
//@route GET/api/donors/logout
//@access Private


const logoutDonor = asyncHandler(async (req,res) =>{
  res.cookie('jwt' , '' , {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({message: 'Logged Out Successfully'});

});




//@desc Get Donors Profile 
//@route GET/api/donors/profile
//@access Private
const getDonorProfile = asyncHandler(async (req,res) =>{

  const donor = await Donor.findById(req.donor._id);

  if(donor){
     res.status(201).json({
      name: donor.name,
      dept: donor.dept,
      batch: donor.batch,
      currentLocation:donor.currentLocation,
      lastDonationDate:donor.lastDonationDate,
      email: donor.email,
      phoneNumber:donor.phoneNumber,
      bloodType:donor.bloodType,
    });
  }
  else{
    res.status(404);
    throw new Error('Donor not found');
  }
  

});



//@desc Update Donors Profile 
//@route PUT/api/donors/profile
//@access Private
const updateDonorProfile = asyncHandler(async (req, res) => {
  const donor = await Donor.findById(req.donor._id);

  if(donor){
    donor.phoneNumber = req.body.phoneNumber || donor.phoneNumber;
    donor.lastDonationDate = req.body.lastDonationDate || donor.lastDonationDate
    donor.currentLocation= req.body.currentLocation || donor.currentLocation;
    if(req.body.password){
      donor.password = req.body.password;
    }
    const updatedDonor = await donor.save();

    res.status(200).json({
      _id: updatedDonor._id,
      name: updatedDonor.name,
      dept: updatedDonor.dept,
      batch: updatedDonor.batch,
      email: updatedDonor.email,
      phoneNumber:updatedDonor.phoneNumber,
      bloodType:updatedDonor.bloodType,
      donations:updatedDonor.donations,
      lastDonationDate:updatedDonor.lastDonationDate,
      currentLocation:updatedDonor.currentLocation,
      isAdmin:updatedDonor.isAdmin,
      isCommitteeMember:updatedDonor.isCommitteeMember,
      committeePost:updatedDonor.committeePost,
      committeeImage:updatedDonor.committeeImage,
    });
  }
  else{
    res.json(404);
    throw new error('Donor Not Found');
  }


  
});








//@desc getDonorByID,Create Public Blood Request,and Notify Donor
//@route POST /api/donors/:id/notify_donor
//@access Public

const findDonorByIdAndSendBloodRequest = asyncHandler(async (req, res) => {
  const donor = await Donor.findById(req.params.id);

  if (donor) {
    const {
      name,
      patientProblem,
      bloodGroup,
      amountOfBlood,
      deadlineForDonation,
      contactNumber,
      location,
      additionalInfo,
    } = req.body;

    const publicBloodReq = await PublicBloodReq.create({
      name,
      patientProblem,
      bloodGroup,
      amountOfBlood,
      deadlineForDonation,
      contactNumber,
      location,
      additionalInfo,
    });

    // Notify via Email
    const config = {
      service: 'gmail',
      auth: {
        user: 'shureedshazzad534@gmail.com',
        pass: 'biok spxm bknr ufnc',
      },
    };

    const transporter = nodemailer.createTransport(config);

    const MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Dream Family',
        link: 'https://mailgen.js/',
      },
    });

    

    const response = {
      body: {
        name: donor.name,
        intro: 'A blood request has been created on your behalf. Please contact if you are available ',
        problem: publicBloodReq.patientProblem,
        bloodGroup: publicBloodReq.bloodGroup,
        amountOfBlood: publicBloodReq.amountOfBlood,
        deadlineForDonation: publicBloodReq.deadlineForDonation,
        contactNumber: publicBloodReq.contactNumber,
        location: publicBloodReq.location,
        additionalInfo: publicBloodReq.additionalInfo,
      },
      outro: 'Thank you for your support.',
    };

    const mail = MailGenerator.generate(response);

    const message = {
      from: 'shureedshazzad534@gmail.com',
      to: donor.email,
      subject: ' Blood Request ',
      html: mail,
    };

    transporter.sendMail(message).then(() => {
      res.status(201).json({
        message: 'Blood request is created successfully, and notification is sent to the donor.',
        publicBloodReq,
      });
    }).catch((error) => {
      res.status(500).json({ error });
    });
  } else {
    res.status(404);
    throw new Error('Donor not found');
  }
});








//@desc Get all donors
//@route GET/api/donors
//@access Private/Admin

const getDonors = asyncHandler(async (req,res) => {
    const donors = await Donor.find({});
    res.status(200).json(donors);
 });

 





 //@desc Get donor by id
//@route GET/api/donors/:id
//@access Private/Admin

const getDonorbyId= asyncHandler(async (req,res) => {
  const donor = await Donor.findById(req.params.id).select('-password');

  if(donor){
    return res.json(donor);
  }
  else{
      res.status(404);
      throw new Error('Resource Not Found');
  }
});







//@desc delete donors
//@route DELETE/api/donors/:id
//@access Private/Admin

const deleterDonor = asyncHandler(async (req,res) =>{
  const donor = await Donor.findById(req.params.id);

  if(donor){
    if(donor.isAdmin){
      res.status(400);
      throw new error('Cannot delete admin user');
    }
    await Donor.deleteOne({_id: donor._id});
    res.status(200).json({message: "Donor is deleted successfully"});
  }
  else{
    res.status(404);
    throw new Error('Donor not found');
  }
});






 //@desc update donors
//@route PUT/api/donors/:id
//@access Private/Admin

const updateDonor = asyncHandler(async (req,res) =>{
  const donor = await Donor.findById(req.params.id);

  if(donor){
    donor.isCommitteeMember = Boolean(req.body.isCommitteeMember);
    donor.committeeImage  = req.body.committeeImage || donor.committeeImage;
    donor.committeePost = req.body.committeePost || donor.committeePost;

    const updatedDonor = await donor.save();

    res.json({
      _id: updatedDonor._id,
      name: updatedDonor.name,
      dept: updatedDonor.dept,
      batch: updatedDonor.batch,
      email: updatedDonor.email,
      phoneNumber:updatedDonor.phoneNumber,
      bloodType:updatedDonor.bloodType,
      currentLocation:updatedDonor.currentLocation,
      donations:updatedDonor.donations,
      lastDonationDate:updatedDonor.lastDonationDate,
      isAdmin:updatedDonor.isAdmin,
      isCommitteeMember:updatedDonor.isCommitteeMember,
      committeePost:updatedDonor.committeePost,
      committeeImage:updatedDonor.committeeImage,

    })
  }
  else{
    res.status(404);
    throw new Error('Donor Not Found');
  }
});





 










 export {authDonor,registerDonor,logoutDonor,getDonorProfile,updateDonorProfile,getDonors,deleterDonor,getDonorbyId,
  updateDonor,findDonorByIdAndSendBloodRequest };