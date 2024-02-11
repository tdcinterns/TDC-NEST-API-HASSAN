import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    signup({ username, password, email }: {
        username: string;
        password: string;
        email: string;
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
