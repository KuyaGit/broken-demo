import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'
import { EncryptionService } from 'src/encryption.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private encryptionService: EncryptionService) { }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto.password);
    this.encryptionService.encrpytText(createUserDto.password).then(hashedPassword => {
      createUserDto.password = hashedPassword;
      console.log(createUserDto.password)
      return this.usersService.createUser(createUserDto);
    });

  }


  @Get()
  findAll() {
    return this.usersService.users({});
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
