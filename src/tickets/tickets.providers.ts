import { Connection } from 'mongoose';

import { TicketSchema } from './tickets.schema';
import { TICKET_MODEL_PROVIDER, DB_PROVIDER } from '../constants';

export const ticketsProviders = [
    {
        provide: TICKET_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('Ticket', TicketSchema),
        inject: [DB_PROVIDER],
    },
];
