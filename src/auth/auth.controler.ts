import { AuthService } from './auth.service';
import { Post, Controller, Body, Get, Query, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) {

    }

    @Post('login')
    public async login(@Body() userDto: UserDto) {
        return this.authservice.createToken(userDto);
    }

    @Get('validate-user')
    public async validateUser(@Query() request: UserDto) {
        return this.authservice.validateUser(request);
    }

    @Post('register')
    public async register(@Body() userDto: UserDto) {
        return this.authservice.register(userDto);
    }
}
