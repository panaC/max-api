import { AuthService } from './auth.service';
import { Post, Controller, Body, Get, Query } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) {

    }

    @Post('login')
    public async login(@Body() userDto: UserDto) {
        return this.authservice.createToken(userDto);
    }

    @Get('validate-user')
    public async validateUser(@Query() request: { email: string }) {
        return this.authservice.validateUser(request);
    }

    @Post('register')
    public async register(@Body() userDto: UserDto) {
        return this.authservice.register(userDto);
    }
}
