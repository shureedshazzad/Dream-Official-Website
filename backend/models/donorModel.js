
//createing a donorschema and bloodreqschema. bloodreqschema also a part of donormodel  

import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const bloodReqSchema = new mongoose.Schema({
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




const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
    },
    bloodType: {
        type: String,
        required: true,
    },
    donations: {
        type: Number,
        default: 0,
    },
    lastDonationDate: {
        type: Date,
        default: null,
    },
    currentLocation:{
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    isCommitteeMember: {
        type: Boolean,
        required: true,
        default: false,
    },
    committeeImage: {
        type: String,
        required:true,
        default:'No Image',
    },
    committeePost: {
        type: String,
        required:true,
        default: 'No Post', 
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },

    

    bloodReqs:[bloodReqSchema],
 
},
{
    timestamps: true,
});

donorSchema.methods.matchPassword =async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

donorSchema.pre('save' , async function(next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
 });

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;
