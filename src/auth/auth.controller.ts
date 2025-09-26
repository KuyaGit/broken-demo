import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthPayloadDto } from './dto/authpayload.dto.';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @HttpCode(200)
    @Post('login')
    async login(@Body() body: AuthPayloadDto) {
        const result = await this.authService.validateUser({email: body.email, password: body.password});
        if (!result) { 
            throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
        }
        console.log('result', result);
        return this.authService.login(result);
    }
}
