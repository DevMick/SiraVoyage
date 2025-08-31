const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// Routes pour les témoignages
router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);
router.post('/', testimonialController.createTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);
router.get('/average-rating', testimonialController.getAverageRating);

module.exports = router; 