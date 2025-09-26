
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthPayloadDto } from './dto/authpayload.dto.';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser({email, password}: AuthPayloadDto) {
    const user = await this.usersService.users({ where: { email } });
    if (user[0]) {
      if (user[0].password) {
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (isMatch) {
          const { password, ...result } = user[0];
          return result;
        }
      }
    }
    return null;
  }
  
  async login(user: any) {
    const payload = { name: user.username, email: user.email};
    return {
      status: 200,
      access_token: this.jwtService.sign(payload),
    };
  }
}
