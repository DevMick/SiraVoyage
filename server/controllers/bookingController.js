const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.getAll();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.getById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la réservation', error: error.message });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const bookingId = await Booking.create(req.body);
        res.status(201).json({ id: bookingId, message: 'Réservation créée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la réservation', error: error.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const result = await Booking.updateStatus(req.params.id, status);
        if (result === 0) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.json({ message: 'Statut de la réservation mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut', error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const result = await Booking.delete(req.params.id);
        if (result === 0) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la réservation', error: error.message });
    }
}; 