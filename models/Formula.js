const mongoose = require('mongoose');

const formulaSchema = new mongoose.Schema({
    tripType: {
        type: String,
        required: true,
        enum: ['Omra', 'Hajj', 'Omra Ramadhan']
    },
    departureCity: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    medinaNights: {
        type: Number,
        required: true
    },
    makkahNights: {
        type: Number,
        required: true
    },
    medinaHotel: {
        type: String,
        required: true
    },
    makkahHotel: {
        type: String,
        required: true
    },
    airlineLogo: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    price: {
        type: Number,
        required: true
    },
    rates: {
        individual: {
            type: Number,
            required: true
        },
        double: {
            type: Number,
            required: true
        },
        triple: {
            type: Number,
            required: true
        },
        quadruple: {
            type: Number,
            required: true
        },
        baby: {
            type: Number,
            required: true
        },
        childDiscount: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Formula', formulaSchema); 