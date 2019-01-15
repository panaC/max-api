import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'dist/database/database.module';
import { AuthController } from './auth.controler';
import { authProviders } from './auth.providers';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    DatabaseModule,
    passportModule,
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
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
