"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const roles_enum_1 = require("./roles.enum");
let AuthService = class AuthService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async signup({ username, password, email, role }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await this.prismaService.prisma().user.findFirst({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException('User with this email already exists.');
        }
        const user = await this.prismaService.prisma().user.create({
            data: {
                username,
                password: hashedPassword,
                email,
                role: role || roles_enum_1.UserRole.USER,
            },
        });
        return this.login({ username, password });
    }
    async login({ username, password }) {
        const user = await this.prismaService.prisma().user.findFirst({
            where: { username },
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid username or password.');
        }
        const payload = { sub: user.id, username: user.username, role: user.role || roles_enum_1.UserRole.USER };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map