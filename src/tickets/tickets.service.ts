import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { Ticket } from './interfaces/ticket.interface';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TICKET_MODEL_PROVIDER } from '../constants';

@Component()
export class TicketsService {
    constructor(
        @Inject(TICKET_MODEL_PROVIDER) private readonly ticketModel: Model<Ticket>) {

    }

    async delete(deleteTicketDto: CreateTicketDto): Promise<void> {
        this.ticketModel.deleteOne(deleteTicketDto).exec();
    }

    async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
        const createdTicket = new this.ticketModel(createTicketDto);
        return await createdTicket.save();
    }

    async findAll(): Promise<Ticket[]> {
        return await this.ticketModel.find().exec();
    }
}
