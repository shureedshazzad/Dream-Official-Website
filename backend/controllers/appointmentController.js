import asyncHandler from "../middleware/asyncHandler.js";
import Appointment from "../models/appointmentModel.js";
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';


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


// @desc Admin action: Confirm appointment and send email
// @route POST /api/appointments/confirm/:id
// @access Private/Admin

const confirmAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate("doctor_id");

  if (appointment) {
    // Update appointment status to true
    appointment.status = true;
    await appointment.save();

    const textResponse = `
      Dear ${appointment.doctor_id.name},

      Your appointment has been confirmed for the following details:

      - Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}
      - Time: ${appointment.doctor_id.availableTime.startTime} - ${appointment.doctor_id.availableTime.endTime}

      Thank you for choosing our service.

      Best regards,
      [Your Company Name]
    `;

    const config = {
      service: 'gmail',
      auth: {
        user: 'shureedshazzad534@gmail.com',
        pass: 'biok spxm bknr ufnc',
      },
    };

    const transporter = nodemailer.createTransport(config);

    const message = {
      from: 'shureedshazzad534@gmail.com',
      to: appointment.email,
      subject: 'Appointment Approved ',
      text: textResponse, // Use text property for plain text
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending confirmation email' });
      } else {
        res.status(200).json({
          message: 'Appointment confirmed successfully',
          appointment: {
            ...appointment._doc,
            status: true,
          },
        });
      }
    });
  } else {
    res.status(404).json({ error: 'Appointment not found' });
  }
});










const adjustAppointmentDate = (originalDate, availableDays) => {
  const appointmentDate = new Date(originalDate);
  const dayIndex = appointmentDate.getDay();
  const day = dayIndex === 0 ? 7 : dayIndex; // Convert Sunday (0) to 7

  if (!availableDays.includes(day)) {
    // Find the next available day
    let nextAvailableDay = day;
    while (!availableDays.includes(nextAvailableDay)) {
      nextAvailableDay = nextAvailableDay % 7 + 1;
    }

    // Adjust appointment date to the next available day
    appointmentDate.setDate(appointmentDate.getDate() + nextAvailableDay - day);
  }

  return appointmentDate.toDateString();
};


  export {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    deleteAppointment,
    confirmAppointment 
  };


  
  