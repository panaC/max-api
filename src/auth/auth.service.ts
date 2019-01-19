import { JwtService } from '@nestjs/jwt';
import { Injectable, Inject } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { USER_MODEL_PROVIDER, JWT_EXPIRATION } from '../constants';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_MODEL_PROVIDER) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService) {

    }

    async createToken(e: string) {
        const user: JwtPayload = { email: e };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: JWT_EXPIRATION,
            accessToken,
        };
    }

    async verifyToken(token: string) {
        return this.jwtService.verify(token);
    }

    async getUser(e: string) {
        const user = await this.userModel.findOne({
            email: e,
        });
        return user;
    }

    async setUser(userDto: UserDto) {
        await this.userModel.update({ email: userDto.email }, userDto);
    }

    async checkUser(e: string, pass: string) {
        const user = await this.userModel.findOne({
            email: e,
        });
        if (!(user && await bcrypt.compare(pass, user.password) === true)) {
            throw new Error('invalid credential');
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userModel.findOne({ email: payload.email });
    }

    async register(userDto: UserDto) {
        try {
            const createdUser = new this.userModel(userDto);
            await createdUser.save();
        } catch (err) {
            const customError = 'User already exist or something went wrong';
                // err.code === '11000' ? 'User already exist' : 'Something went wrong ..';
            throw new Error(err);
        }
    }
}
