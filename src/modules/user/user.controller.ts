import { Body, Controller, Get, Param, Post, Put, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './dto';
import { UserService } from './user.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { UserRole } from 'src/shared/enums/role.enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from 'src/shared/pipe/file-size.pipe';

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

    @Get(':id/interactions')
    async getInteractions(@Param('id') id: string) {
        return await this.userService.getInteractions(id)
    }

    @Post()
    async createUser(@Body() body: UserCreateDto) {
        return await this.userService.createUser(body)
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async updateUser(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() body: UserUpdateDto) {
        return await this.userService.updateUser(id, body, file)
    }

    //@Auth(UserRole.Staff)
    @Get('/roles/generate')
    async generateRoles() {
        return await this.userService.generateRoles()
    }
}
