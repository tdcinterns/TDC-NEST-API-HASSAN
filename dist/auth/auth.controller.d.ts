import { AuthService } from './auth.service';
import { UserRole } from './roles.enum';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: {
        username: string;
        password: string;
        email: string;
        role?: UserRole;
    }): Promise<{
        access_token: string;
    }>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
