import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';
import { Ticket as TicketInterface } from './interfaces/ticket.interface';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Delete()
    async delete(@Body() deleteTicketDto: CreateTicketDto) {
        this.ticketsService.delete(deleteTicketDto);
    }

    @Post()
    async create(@Body() createTicketDto: CreateTicketDto) {
        this.ticketsService.create(createTicketDto);
    }

    @Get()
    async findAll(): Promise<TicketInterface[]> {
        return this.ticketsService.findAll();
    }
}
