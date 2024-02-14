import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from './roles.enum'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup({ username, password, email, role }: { username: string; password: string; email: string; role?: UserRole }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.prismaService.prisma().user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists.');
    }

    const user = await this.prismaService.prisma().user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role: role || UserRole.USER, 
      },
    });

    return this.login({username, password});
  }

  async login({ username, password }: { username: string; password: string }) {
    const user = await this.prismaService.prisma().user.findFirst({
      where: { username },
    });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password.');
    }
  
    const payload = { sub: user.id, username: user.username, role: user.role || UserRole.USER };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}
