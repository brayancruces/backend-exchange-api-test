import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: 'S3CR3T0', 
        signOptions: { expiresIn: '1h' },
      }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, AuthService],
    controllers: [AuthController],
  })
  export class AuthModule {}
