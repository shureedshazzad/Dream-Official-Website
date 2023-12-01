import asyncHandler from "../middleware/asyncHandler.js";
import Event from "../models/eventsModel.js";

// @desc    Create a event
// @route   POST /api/events/create
// @access  Private/Admin

const createEvent = asyncHandler(async (req, res) => {
    const {
        heading,
        description,
        image,
        availableday
    } = req.body;
  
    const event = await Event.create({
        heading,
        description,
        image,
        availableday
    });
  
    if (event) {
      res.status(201).json(event);
    } else {
      res.status(400);
      throw new Error("Invalid event data");
    }
  });



  
//@desc Get all events
//@route GET /api/events/get
//@access Public
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({});
    res.status(200).json(events);
  });


//@desc Get event by ID
//@route GET /api/events/:id
//@access Public
const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
  
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  });


  //@desc Update event
//@route PUT /api/events/:id
//@access Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
  
    if (event) {
      event.heading = req.body.heading || event.heading;
      event.description = req.body.description || event.description;
      event.image = req.body.image || event.image;
      event.availableday = req.body.availableday || event.availableday;
  
      const updatedEvent = await event.save();
  
      res.status(200).json({
        _id:updatedEvent._id,
        heading:updatedEvent.heading,
        description:updatedEvent.description,
        image:updatedEvent.image,
        availableday:updatedEvent.availableday,
    });
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  });



  //@desc Delete event
//@route DELETE /api/events/:id
//@access Private/Admin

const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
  
    if (event) {
      await Event.deleteOne({ _id: event._id });
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  });


  export{createEvent,getEvents,getEventById,updateEvent,deleteEvent};






  
