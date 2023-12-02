
import mongoose from "mongoose";

const privateBloodReqSchema = new mongoose.Schema({

    donor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',
        required: true,
      },
    

    patientProblem: {
        type: String,
        default: null,
        required:true // Set the default value to null
    },

    bloodGroup: {
        type: String,
        default: null,
        required:true // Set the default value to null
    },

    amountOfBlood:{
        type: Number,
        default: null,
        required:true
    },

    deadlineForDonation:{
        type:Date,
        default:null,
        required:true
    },

    contactNumber:{
        type:String,
        default:null,
        required:true,
    },

    location:{
        type:String,
        default:null,
        required:true,
    },
    status: {
        type: String,
        default: "pending" // Set the default value to "pending"
    },
    additionalInfo:{
        type:String,
        default:null,
    },

});

const PrivateBloodRequest = mongoose.model("PrivateBloodRequest",privateBloodReqSchema );

export default PrivateBloodRequest;
