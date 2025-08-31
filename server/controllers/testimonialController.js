const Testimonial = require('../models/Testimonial');

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.getAll();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des témoignages', error: error.message });
    }
};

exports.getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.getById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Témoignage non trouvé' });
        }
        res.json(testimonial);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du témoignage', error: error.message });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const testimonialId = await Testimonial.create(req.body);
        res.status(201).json({ id: testimonialId, message: 'Témoignage créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du témoignage', error: error.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    try {
        const result = await Testimonial.update(req.params.id, req.body);
        if (result === 0) {
            return res.status(404).json({ message: 'Témoignage non trouvé' });
        }
        res.json({ message: 'Témoignage mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du témoignage', error: error.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const result = await Testimonial.delete(req.params.id);
        if (result === 0) {
            return res.status(404).json({ message: 'Témoignage non trouvé' });
        }
        res.json({ message: 'Témoignage supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du témoignage', error: error.message });
    }
};

exports.getAverageRating = async (req, res) => {
    try {
        const averageRating = await Testimonial.getAverageRating();
        res.json({ averageRating });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la note moyenne', error: error.message });
    }
}; 