const Booking = require('../models/booking');
const Service = require('../models/service');

// Create a new booking
exports.createBooking = async (req, res, next) => {
  try {
    const { serviceId, bookingDate } = req.body;
    const booking = await Booking.create({
      userId: req.user.userId,
      serviceId,
      bookingDate,
      status: 'pending'
    });
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

// Get all bookings for the logged-in user
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.userId },
      include: [Service]
    });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// Get a single booking by ID (only if it belongs to the user)
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.id, userId: req.user.userId },
      include: [Service]
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

// Update booking status (user can only cancel their own booking)
exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.id, userId: req.user.userId }
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

// Delete a booking (user can only delete their own booking)
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.id, userId: req.user.userId }
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await booking.destroy();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    next(err);
  }
};
