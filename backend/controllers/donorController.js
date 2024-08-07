
import { error } from "console";
import asyncHandler from "../middleware/asyncHandler.js";
import Donor from "../models/donorModel.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from 'nodemailer';
import generateOtp from "../utils/generateOtp.js";




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


// @desc Forgot Password - Send OTP via Email
// @route POST/api/donors/forgot-password
// @access Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const donor = await Donor.findOne({ email });

  if (donor) {
    // Generate OTP
    const otp = generateOtp();

    // Set OTP 
    donor.otp = otp;

    await donor.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shureedshazzad534@gmail.com',
        pass: 'biok spxm bknr ufnc',
      },
    });

    const message = {
      from: 'shureedshazzad534@gmail.com',
      to: donor.email,
      subject: 'Password Recovery OTP',
      text: `Your OTP for password recovery is: ${otp}`,
    };

    transporter.sendMail(message)
      .then(() => {
        res.status(200).json({ message: 'OTP sent successfully. Check your email.' });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    res.status(404).json({ error: 'Donor not found' });
  }
});


// @desc Verify OTP
// @route POST /api/donors/verify-otp
// @access Public
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const donor = await Donor.findOne({ email });

  if (donor && donor.otp) {
    const expirationTime = new Date(Date.now() + 4 * 60 * 1000); // Set expiration to 4 minutes

    if (new Date() < expirationTime) {
      if (otp === donor.otp) {
        // OTP is valid
        res.status(200).json({ message: 'OTP verification successful.' });
      } else {
        res.status(401).json({ error: 'Invalid OTP.' });
      }
    } else {
      res.status(401).json({ error: 'OTP expired.' });
    }
  } else {
    res.status(404).json({ error: 'Donor not found or OTP not generated.' });
  }
});



// @desc Reset Password without OTP verification (since OTP is already verified)
// @route POST /api/donors/reset-password
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const donor = await Donor.findOne({ email });

  if (donor) {
    // Reset password
    donor.password = password;
    await donor.save();

    res.status(200).json({ message: 'Password reset successful.' });
  } else {
    res.status(404).json({ error: 'Donor not found.' });
  }
});


//@desc Register Donor
//@route POST/api/donors
//@access Public


const registerDonor = asyncHandler(async (req, res) => {
  const {
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
  } = req.body;

  const donorExists = await Donor.findOne({ email });
  if (donorExists) {
    res.status(400);
    throw new Error('Donor already exists');
  }

  let isAdmin = false;

  if (email === 'shureedshazzad534@gmail.com') {
    isAdmin = true;
  }

  const donor = await Donor.create({
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
  });

  if (donor) {
    // Generate OTP
    const otp = generateOtp();

    // Set OTP 
    donor.otp = otp;

    await donor.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shureedshazzad534@gmail.com',
        pass: 'biok spxm bknr ufnc',
      },
    });

    const message = {
      from: 'shureedshazzad534@gmail.com',
      to: donor.email,
      subject: 'Registration related OTP',
      text: `Your OTP  is: ${otp}`,
    };

    transporter.sendMail(message)
      .then(() => {
        res.status(200).json({ message: 'An OTP is sent to your email. Check your email' });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    res.status(404).json({ error: 'Donor not found' });
  }
});






// @desc Verify OTP after registration
// @route POST /api/donors/verify-otp-reg
// @access Public

const verifyOTPReg = asyncHandler(async (req, res) => {
  const { email, otp, count } = req.body;

  const donor = await Donor.findOne({ email });

  if (!donor || !donor.otp) {
    res.status(404).json({ error: 'Donor not found or OTP not generated.' });
    return; // Return to prevent further execution
  }

  if (count === 0) {
    res.status(401).json({ error: 'Invalid OTP.' });
    await Donor.findOneAndDelete({ email }); // Delete donor since OTP is invalid
    return; // Return to prevent further execution
  }

  if(otp===null || otp !== donor.otp)
  {
    res.status(401).json({ error: 'Sorry invalid OTP. Try again' });
  }

  if(otp === donor.otp){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shureedshazzad534@gmail.com',
      pass: 'biok spxm bknr ufnc',
    },
  });

  const telegramLink = 'https://t.me/+daR9TtpKvoRiY2Q1';
  const messageText = `Congratulations! You have become a member of our Dream family. Look forward to doing more with you. Join our Telegram group: ${telegramLink}`;

  const message = {
    from: 'shureedshazzad534@gmail.com',
    to: donor.email,
    subject: 'Dream Registration',
    text: messageText,
  };

  transporter.sendMail(message)
    .then(() => {
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
        currentLocation: donor.currentLocation,
        isCommitteeMember: donor.isCommitteeMember,
        committeePost: donor.committeePost,
        committeeImage: donor.committeeImage,
        otp: donor.otp,
        message: 'You should receive an email with registration confirmation.',
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
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
  updateDonor,forgotPassword,verifyOTP,resetPassword,verifyOTPReg};