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
    public async login(@Body() user: { email: string; password: string }) {
        try {
            await this.authservice.checkUser(user.email, user.password);
            return await this.authservice.createToken(user.email);
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

    @Get('user')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'get user account with the token',
    })
    public async userAccount(@Query('token') token: string) {
        try {
            const verify = await this.authservice.verifyToken(token);
            if (verify.email) {
                return await this.authservice.getUser(verify.email);
            }
            throw new Error('invalid credential');
        } catch (err) {
            throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('user')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'update user information',
    })
    public async userUpdate(@Query('token') token: string, @Body() user: UserDto) {
        try {
            const verify = await this.authservice.verifyToken(token);
            await this.authservice.setUser(user);
            return 'user saved';
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
            return await this.authservice.createToken(userDto.email);
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
