import { Document } from 'mongoose';

export interface Ticket extends Document {
    readonly email: string;
    readonly originCode: string;
    readonly destinationCode: string;
    readonly departureDateTime: Date;
}
