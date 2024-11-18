import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './dto';
import { UserService } from './user.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { UserRole } from 'src/shared/enums/role.enums';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }
    @Get()
    async getUsers() {
        return await this.userService.getUsers()
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return await this.userService.getUserById(id)
    }

    @Post()
    async createUser(@Body() body: UserCreateDto) {
        return await this.userService.createUser(body)
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() body: UserUpdateDto) {
        return await this.userService.updateUser(id, body)
    }

    //@Auth(UserRole.Staff)
    @Get('/roles/generate')
    async generateRoles() {
        return await this.userService.generateRoles()
    }
}
