import { AUTH_PASS_API } from './../constants';
import { Controller, Get, Post, Body, Delete, Query, HttpCode, HttpStatus, HttpException, Put, UseGuards } from '@nestjs/common';
import { TicketDto } from './dto/slot.dto';
import { TicketsService, IticketAppli } from './tickets.service';
import { Ticket as TicketInterface } from './interfaces/ticket.interface';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
@ApiUseTags('Tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'create ticket',
    })
    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async create(@Body() ticketDto: TicketDto, @Query('token') token: string) {
        try {
            // add a token verification that the email is the same that for token register
            await this.ticketsService.create(ticketDto);
            return 'ticket saved';
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'read ticket with email user',
    })
    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async read(@Query('email') email: string, @Query('token') token: string): Promise<TicketInterface[]> {
        try {
            return await this.ticketsService.find(email);
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'update ticket with email user',
    })
    @Put()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async update(@Body() ticketDto: TicketDto, @Query('token') token: string) {
        try {
            this.ticketsService.update(ticketDto);
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'delete ticket with email user',
    })
    @Delete()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async delete(@Body() ticketDto: TicketDto, @Query('token') token: string) {
        try {
            this.ticketsService.delete(ticketDto);
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    // for appli:

    // find all mongo db

    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'find tickets : reserved appli',
    })
    @Get('appli')
    async findAllAppli(@Query('credential') credential: string) {
        try {
            // check credential here
            if (credential !== AUTH_PASS_API) {
                throw new Error('Bad credential');
            }
            return await this.ticketsService.findAllAppli();
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    // delete one ticket on all mongo db

    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'delete tickets : reserved appli',
    })
    @Delete('appli')
    async deleteOneAppli(@Query('credential') credential: string, @Body() ticketAppli: IticketAppli) {
        try {
            // check credential here
            if (credential !== AUTH_PASS_API) {
                throw new Error('Bad credential');
            }
            return await this.ticketsService.deleteOneAppli(ticketAppli);
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }
}
