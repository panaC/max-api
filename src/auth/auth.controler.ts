import { AuthService } from './auth.service';
import { Post, Controller, Body, Get, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { ValidationPipe } from '../pipe/validation.pipe';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) {

    }

    @Post('login')
    public async login(@Body(new ValidationPipe()) userDto: UserDto) {
        return this.authservice.createToken(userDto);
    }

    @Get('validate-user')
    public async validateUser(@Query() request: UserDto) {
        return this.authservice.validateUser(request);
    }

    @Post('register')
    public async register(@Body() userDto: UserDto) {
        try {
            await this.authservice.register(userDto);
            return await this.authservice.createToken(userDto);
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('test')
    @UseGuards(AuthGuard())
    public test() {
        return [];
    }
}
