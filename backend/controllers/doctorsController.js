import asyncHandler from "../middleware/asyncHandler.js";
import Doctor from "../models/doctorsModel.js";


// @desc    Create a doctor
// @route   POST /api/doctors/create
// @access  Private/Admin

const createDoctor = asyncHandler(async (req, res) => {
    const {
      name,
      mobileNumber,
      email,
      specializedArea,
      availableDays,
      availableTime,
    } = req.body;
  
    const doctor = await Doctor.create({
      name,
      mobileNumber,
      email,
      specializedArea,
      availableDays,
      availableTime,
    });
  
    if (doctor) {
      res.status(201).json(doctor);
    } else {
      res.status(400);
      throw new Error("Invalid doctor data");
    }
  });


//@desc Get all doctors
//@route GET /api/doctors/get
//@access Public
const getDoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  });
  



//@desc Get doctor by ID
//@route GET /api/doctors/:id
//@access Public
const getDoctorById = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
  
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404);
      throw new Error("Doctor not found");
    }
  });



//@desc Update doctor
//@route PUT /api/doctors/:id
//@access Private/Admin
const updateDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
  
    if (doctor) {
      doctor.name = req.body.name || doctor.name;
      doctor.mobileNumber = req.body.mobileNumber || doctor.mobileNumber;
      doctor.email = req.body.email || doctor.email;
      doctor.specializedArea = req.body.specializedArea || doctor.specializedArea;
      doctor.availableDays = req.body.availableDays || doctor.availableDays;
      doctor.availableTime = req.body.availableTime || doctor.availableTime;
  
      const updatedDoctor = await doctor.save();
  
      res.status(200).json({
        _id:updatedDoctor._id,
        name:updatedDoctor.name,
        mobileNumber:updatedDoctor.mobileNumber,
        email:updatedDoctor.email,
        specializedArea:updatedDoctor.specializedArea,
        availableDays:updatedDoctor.availableDays,
        availableTime:updatedDoctor.availableTime
    });
    } else {
      res.status(404);
      throw new Error("Doctor not found");
    }
  });



  //@desc Delete doctor
//@route DELETE /api/doctors/:id
//@access Private/Admin
const deleteDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
  
    if (doctor) {
      await Doctor.deleteOne({ _id: doctor._id });
      res.status(200).json({ message: "Doctor deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Doctor not found");
    }
  });

  export{createDoctor,getDoctors,getDoctorById,updateDoctor,deleteDoctor};
  
 