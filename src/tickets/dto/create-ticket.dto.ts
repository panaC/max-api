// TODO: add class-validator

export class CreateTicketDto {
    readonly origin: string;
    readonly destination: string;
    readonly departureDate: Date;
}
