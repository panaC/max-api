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

    async delete(ticketDto: TicketDto): Promise<void> {
        await this.ticketModel.deleteOne(ticketDto).exec();
    }

    async create(ticketDto: TicketDto): Promise<Ticket> {
        const createdTicket = new this.ticketModel(ticketDto);
        return await createdTicket.save();
    }

    async find(e: string): Promise<Ticket[]> {
        return await this.ticketModel.find({ email: e }).exec();
    }

    async update(ticketDto: TicketDto) {
        this.ticketModel.update({ email: ticketDto.email }, ticketDto);
    }
}
