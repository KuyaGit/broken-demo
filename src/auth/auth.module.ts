import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';




@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'test123',
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthService, UsersService, JwtService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
