import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { UserSigninDto, UserSignupDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}
  @Post('signin')
  async signIn(@Body() user: UserSigninDto) {
    try {
      return await this.authService.signIn(user);
    } catch (error) {
      this.handleErrorFunc(error);
    }
  }

  @Post('signup')
  async signup(@Body() user: UserSignupDto) {
    try {
      return await this.authService.signUp(user);
    } catch (error) {
      this.handleErrorFunc(error);
    }
  }

  private handleErrorFunc(error: Error) {
    this.logger.log(error);

    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}
