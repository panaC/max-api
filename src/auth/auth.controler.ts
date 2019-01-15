import { AuthService } from './auth.service';
import { Post, Controller, Body, Get, Query, UseGuards, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiResponse, ApiBearerAuth, ApiImplicitBody } from '@nestjs/swagger';

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
        try {
            await this.authservice.checkUser(userDto);
            return await this.authservice.createToken(userDto);
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('validate-user')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'get validate user',
    })
    public async validateUser(@Body() request: UserDto) {
        try {
            return await this.authservice.validateUser(request);
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('verify')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'verify credential',
    })
    public async verify(@Query('token') token: string) {
        try {
            return await this.authservice.verifyToken(token);
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
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
