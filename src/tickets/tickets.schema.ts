import * as mongoose from 'mongoose';

export const TicketSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    departureDate: {
        type: Date,
        required: true,
    },
});
