import asyncHandler from "../middleware/asyncHandler.js";
import Appointment from "../models/appointmentModel.js";


// @desc Create appointment with a specific doctor
// @route POST /api/appointments/create
// @access Public
const createAppointment = asyncHandler(async (req, res) => {
    const {
      doctor_id,
      name,
      email,
      mobileNumber,
      appointmentDate,
      patientProblem,
    } = req.body;
  
    const appointment = await Appointment.create({
      doctor_id,
      name,
      email,
      mobileNumber,
      appointmentDate,
      patientProblem,
    });
  
    if (appointment) {
      res.status(201).json(appointment);
    } else {
      res.status(400);
      throw new Error("Invalid appointment data");
    }
  });


// @desc Get all appointments
// @route GET /api/appointments/all
// @access Private/Admin
const getAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({}).populate("doctor_id");
    res.status(200).json(appointments);
  });


// @desc Get appointment by ID
// @route GET /api/appointments/:id
// @access Private/Admin
const getAppointmentById = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id).populate(
      "doctor_id"
    );
  
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404);
      throw new Error("Appointment not found");
    }
  });


  // @desc Delete appointment
// @route DELETE /api/appointments/:id
// @access Private/Admin
const deleteAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
  
    if (appointment) {
      await Appointment.deleteOne({ _id: appointment._id });
      res.status(204).json({ message: "Appointment deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Appointment not found");
    }
  });


  export {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    deleteAppointment,
  };


  
  