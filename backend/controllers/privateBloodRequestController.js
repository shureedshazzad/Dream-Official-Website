import asyncHandler from "../middleware/asyncHandler.js";
import PrivateBloodRequest from "../models/privateBloodReqModel.js";
import Donor from "../models/donorModel.js";
import nodemailer from 'nodemailer';
import TelegramBot from "node-telegram-bot-api";

// @desc Create a private blood request of a donor
// @route POST /api/privateBloodRequest/create
// @access Private
const createPrivateBloodRequest = asyncHandler(async (req, res) => {

  const donor = await Donor.findById(req.donor._id);
    const {
      donor_id,
      patientProblem,
      bloodGroup,
      amountOfBlood,
      deadlineForDonation,
      contactNumber,
      location,
      additionalInfo
    } = req.body;


    try {
      const bloodRequest = await PrivateBloodRequest.create({
        donor_id,
        patientProblem,
        bloodGroup,
        amountOfBlood,
        deadlineForDonation,
        contactNumber,
        location,
        additionalInfo
  
    });

    res.status(201).json(bloodRequest);

       // Notify via Telegram bot
       const botToken = '6486965804:AAFrhv0wjmZwZrtSKSn5zlRH-WJdH-kHCI0';
       const chatId = '-4091487083';
 
       const bot = new TelegramBot(botToken, { polling: false });
 
       const message = `
         New Blood Donation Request:
         From:${donor.name}
         Patient Problem: ${bloodRequest.patientProblem}
         Blood Group: ${bloodRequest.bloodGroup}
         Amount of Blood: ${bloodRequest.amountOfBlood}
         Deadline for Donation: ${bloodRequest.deadlineForDonation}
         Contact Number: ${bloodRequest.contactNumber}
         Location: ${bloodRequest.location}
         Additional Info: ${bloodRequest.additionalInfo}
       `;
 
       await bot.sendMessage(chatId, message)

      
    } catch (error) {
      res.status(400);
      throw new Error('Invalid blood donation request data');
      
    }

  });



// @desc Get all private bloodrequests
// @route GET /api/privateBloodRequest/all
// @access Public
const getAllPrivateBloodRequst = asyncHandler(async (req, res) => {
    const bloodRequests = await PrivateBloodRequest.find({}).populate("donor_id");
    res.status(200).json(bloodRequests);
  });


// @desc Get bloodrequest by ID
// @route GET /api/privateBloodRequest/:id
// @access Public
const getPrivateBloodRequestById = asyncHandler(async (req, res) => {
    const bloodRequest = await PrivateBloodRequest.findById(req.params.id).populate(
      "donor_id"
    );
  
    if (bloodRequest) {
      res.status(200).json(bloodRequest);
    } else {
      res.status(404);
      throw new Error("BloodRequest not found");
    }
  });


// @desc Delete appointment
// @route DELETE /api/privateBloodRequet/:id
// @access Private
const deletePrivateBloodRequest = asyncHandler(async (req, res) => {
   
  
    const bloodRequest = await PrivateBloodRequest.findById(req.params.id);
  
    if (bloodRequest) {
      await PrivateBloodRequest.deleteOne({ _id: bloodRequest._id });
      res.status(204).json({ message: "BloodRequest deleted successfully" });
    } else {
      res.status(404);
      throw new Error("BloodRequest not found");
    }
  });


  //@desc accept a request
  //@route POST/api/privateBloodRequest/accept/:id
  //@access Private

  const acceptBloodRequest = asyncHandler(async (req, res) => {
    try {
      // Find the blood request and populate the associated donor
      const bloodrequest = await PrivateBloodRequest.findById(req.params.id).populate('donor_id');
      const donor = await Donor.findById(req.donor._id);
  
      if (bloodrequest) {
        // Update the status of the blood request to 'accepted'
        bloodrequest.status = 'accepted';
        await bloodrequest.save();
  
        // Configure your email transport
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'shureedshazzad534@gmail.com',
            pass: 'biok spxm bknr ufnc',
          },
        });
  
        // Construct the email message
        const textResponse = `
          Dear ${bloodrequest.donor_id.name},
  
          We are pleased to inform you that your recent blood request has been accepted by a generous donor in our system. Their willingness to contribute and support 
          your cause is truly commendable.
  
          Here are the details of the donor:
          - Donor Name: ${donor.name}
          - Batch: ${donor.batch} 
          - Email: ${donor.email}
          - Contact Number: ${donor.phoneNumber}
  
          We recommend reaching out to the donor at your earliest convenience to coordinate the blood donation process. Please 
          ensure that you provide them with any necessary information or instructions.
          Thank you for using our blood donation system. We wish you a successful blood donation process and extend
          our gratitude to the donor for their selfless act.
  
          Best regards,
          Dream Family
        `;
  
        const message = {
          from: 'shureedshazzad534@gmail.com', // Replace with your email
          to: bloodrequest.donor_id.email,
          subject: 'Blood Request Accepted!',
          text: textResponse, // Use text property for plain text
        };
  
        // Send the email
        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error sending confirmation email' });
          } else {
            res.status(200).json({
              message: 'Blood request accepted successfully',
              bloodrequest: {
                ...bloodrequest._doc,
                status: 'accepted',
              },
            });
          }
        });
      } else {
        res.status(404).json({ error: 'Blood request not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });








  export{createPrivateBloodRequest,getAllPrivateBloodRequst,getPrivateBloodRequestById,deletePrivateBloodRequest,acceptBloodRequest};
