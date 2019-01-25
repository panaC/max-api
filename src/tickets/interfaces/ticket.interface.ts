import { Document } from 'mongoose';

export interface Ticket extends Document {
    readonly email: string;
    readonly origin: string;
    readonly originCode: string;
    readonly destination: string;
    readonly destinationCode: string;
    readonly departureDateTime: Date;
}
