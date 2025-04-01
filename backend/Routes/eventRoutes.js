import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import Event from '../models/Events.js';

const router = express.Router();

router.post('/create-events', authenticate, async (req, res) => {
     const { eventName, dateTime, venue, description } = req.body;

  try {
    const newEvent = new Event({
      eventName,
      dateTime,
      venue,
      description,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
