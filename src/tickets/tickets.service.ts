import { USER_MODEL_PROVIDER } from './../constants';
import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';

import { Ticket } from './interfaces/ticket.interface';
import { User } from './../auth/interfaces/user.interface';
import { TicketDto } from './dto/slot.dto';
import { TICKET_MODEL_PROVIDER } from '../constants';

export interface IticketAppli {
    origin: string;
    originCode: string;
    destination: string;
    destinationCode: string;
    departureDateTime: Date;
    hccode: string;
    dateOfBirth: string;
}

@Injectable()
export class TicketsService {
    constructor(
        @Inject(TICKET_MODEL_PROVIDER) private readonly ticketModel: Model<Ticket>,
        @Inject(USER_MODEL_PROVIDER) private readonly userModel: Model<User>) {

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
        await this.ticketModel.update({ email: ticketDto.email }, ticketDto);
    }

    //

    async findAllAppli(): Promise<IticketAppli[]> {
        const ret: IticketAppli[] = [];
        const ticket = await this.ticketModel.find().exec();

        for (const el of ticket) {
            const user = await this.userModel.findOne({ email: el.email }).exec();
            ret.push({
                departureDateTime: el.departureDateTime,
                origin: el.origin,
                originCode: el.originCode,
                destination: el.destination,
                destinationCode: el.destinationCode,
                hccode: user.hccode,
                dateOfBirth: user.dateOfBirth,
            });
        }
        return ret;
    }

    async deleteOneAppli(ticketAppli: IticketAppli) {
        const user: User = await this.userModel.findOne({
            hccode: ticketAppli.hccode,
        }).exec();
        return await this.ticketModel.deleteOne({
            email: user.email,
            origin: ticketAppli.origin,
            originCode: ticketAppli.originCode,
            destination: ticketAppli.destination,
            destinationCode: ticketAppli.destinationCode,
            departureDateTime: ticketAppli.departureDateTime,
        }).exec();
    }
}
