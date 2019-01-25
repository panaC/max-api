import * as mongoose from 'mongoose';

export const TicketSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    originCode: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    destinationCode: {
        type: String,
        required: true,
    },
    departureDateTime: {
        type: Date,
        required: true,
    },
});
