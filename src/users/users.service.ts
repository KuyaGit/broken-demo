import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, user } from 'generated/prisma';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prismaS: PrismaService) {}

  async user (
    userWhereUniqueInput: Prisma.userWhereUniqueInput): Promise<user | null> {
    return this.prismaS.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
  
 async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userWhereUniqueInput;
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaS.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.userCreateInput): Promise<User> {
    return this.prismaS.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.userWhereUniqueInput;
    data: Prisma.userUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaS.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: number): Promise<User> {
    return this.prismaS.user.delete({
      where: { id: where },
    });
  }
  async findOne(username: string): Promise<User | null> {
    return this.prismaS.user.findUnique({
      where: { username },
    });
  }
}
