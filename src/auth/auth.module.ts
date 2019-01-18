import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controler';
import { authProviders } from './auth.providers';
import { JWT_SECRET_KEY, JWT_EXPIRATION } from '../constants';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    DatabaseModule,
    passportModule,
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: JWT_EXPIRATION,
      },
    }),
  ],
  controllers: [
      AuthController,
  ],
  providers: [
      AuthService,
      JwtStrategy,
      ...authProviders,
  ],
  exports: [
      passportModule,
  ],
})
export class AuthModule {}
