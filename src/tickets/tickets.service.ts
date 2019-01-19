import { Model } from 'mongoose';
import { Component, Inject, Injectable } from '@nestjs/common';

import { Ticket } from './interfaces/ticket.interface';
import { TicketDto } from './dto/slot.dto';
import { TICKET_MODEL_PROVIDER } from '../constants';

@Injectable()
export class TicketsService {
    constructor(
        @Inject(TICKET_MODEL_PROVIDER) private readonly ticketModel: Model<Ticket>) {

    }

    async delete(deleteTicketDto: TicketDto): Promise<void> {
        this.ticketModel.deleteOne(deleteTicketDto).exec();
    }

    async create(createTicketDto: TicketDto): Promise<Ticket> {
        const createdTicket = new this.ticketModel(createTicketDto);
        return await createdTicket.save();
    }

    async findAll(): Promise<Ticket[]> {
        return await this.ticketModel.find().exec();
    }
}
