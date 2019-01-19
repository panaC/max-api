import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TicketDto {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly originCode: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly destinationCode: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly departureDateTime: Date;
}
