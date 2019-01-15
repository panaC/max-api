import { JwtService } from '@nestjs/jwt';
import { Injectable, Inject } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { USER_MODEL_PROVIDER } from '../constants';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_MODEL_PROVIDER) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService) {

    }

    async createToken(userDto: UserDto) {
        // In the real-world app you shouldn't expose this method publicly
        // instead, return a token once you verify user credentials
        const user: JwtPayload = { email: userDto.email };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            accessToken,
        };
    }

    async checkUser(userDto: UserDto) {
        const user = await this.userModel.findOne({
            email: userDto.email,
        });
        if (!(user && await bcrypt.compare(userDto.password, user.password) === true)) {
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
