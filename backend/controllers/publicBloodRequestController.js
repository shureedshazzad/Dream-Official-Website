import asyncHandler from "../middleware/asyncHandler.js";
import PublicBloodReq from "../models/publicBloodReqModel.js";
import TelegramBot from "node-telegram-bot-api";

// Public function to create a blood donation request
const createPublicBloodReq = asyncHandler(async (req, res) => {
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
  
    try {
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
  
      res.status(201).json({
        message: 'Blood donation request created successfully',
        _id: publicBloodReq._id,
        name: publicBloodReq.name,
        patientProblem:publicBloodReq.patientProblem,
        bloodGroup:publicBloodReq.bloodGroup,
        amountOfBlood:publicBloodReq.amountOfBlood,
        deadlineForDonation:publicBloodReq.deadlineForDonation,
        contactNumber:publicBloodReq.contactNumber,
        location:publicBloodReq.location,
        additionalInfo:publicBloodReq.additionalInfo,
        // Include other relevant fields if needed
      });


         // Notify via Telegram bot
         const botToken = '6486965804:AAFrhv0wjmZwZrtSKSn5zlRH-WJdH-kHCI0';
         const chatId = '-4091487083';
   
         const bot = new TelegramBot(botToken, { polling: false });
   
         const message = `
           New Blood Donation Request:
           Request Sender : ${publicBloodReq.name}
           Patient Problem: ${publicBloodReq.patientProblem}
           Blood Group: ${publicBloodReq.bloodGroup}
           Amount of Blood: ${publicBloodReq.amountOfBlood}
           Deadline for Donation: ${publicBloodReq.deadlineForDonation}
           Contact Number: ${publicBloodReq.contactNumber}
           Location: ${publicBloodReq.location}
           Additional Info: ${publicBloodReq.additionalInfo}
         `;
   
         await bot.sendMessage(chatId, message);

    } catch (error) {
      res.status(400);
      throw new Error('Invalid blood donation request data');
    }
  });

  export {createPublicBloodReq};