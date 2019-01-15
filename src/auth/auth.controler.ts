import { AuthService } from './auth.service';
import { Post, Controller, Body, Get, Query, UseGuards, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { ApiUseTags, ApiResponse, ApiBearerAuth, ApiImplicitBody } from '@nestjs/swagger';
import { User } from './interfaces/user.interface';

@Controller('auth')
@ApiUseTags('Authentification')
export class AuthController {
    constructor(private readonly authservice: AuthService) {

    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'login success',
    })
    public async login(@Body() userDto: UserDto) {
        return this.authservice.createToken(userDto);
    }

    @Post('validate-user')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'get validate user',
    })
    public async validateUser(@Body() request: UserDto) {
        return this.authservice.validateUser(request);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 201,
        description: 'register user',
    })
    public async register(@Body() userDto: UserDto) {
        try {
            await this.authservice.register(userDto);
            return await this.authservice.createToken(userDto);
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('test')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'test jwt auth guard',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    public test() {
        return [];
    }
}
