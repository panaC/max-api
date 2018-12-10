import { Document } from 'mongoose';

export interface Ticket extends Document {
    readonly origin: string;
    readonly destination: string;
    readonly departureDate: Date;
}
