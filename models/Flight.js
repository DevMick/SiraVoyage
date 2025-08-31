const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    formulaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Formula',
        required: true
    },
    flightNumber: {
        type: String,
        required: true
    },
    departure: {
        code: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    arrival: {
        code: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    segment: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema); 