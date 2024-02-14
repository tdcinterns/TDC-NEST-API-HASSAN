import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from './roles.enum';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    signup({ username, password, email, role }: {
        username: string;
        password: string;
        email: string;
        role?: UserRole;
    }): Promise<{
        access_token: string;
    }>;
    login({ username, password }: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
