import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EncryptionService } from 'src/encryption.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private encryptionService: EncryptionService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.encryptionService.encrpytText(createUserDto.password).then(hashedPassword => {
      createUserDto.password = hashedPassword;
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
