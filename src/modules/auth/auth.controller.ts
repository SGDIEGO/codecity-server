import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Redirect,
  Response,
  UseGuards,
} from '@nestjs/common';
import { UserSigninDto, UserSignupDto } from './dto';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guards/google.guard';
import { IErrorHandlerAdapter } from 'src/common/application';
import { ErrorHandlerAdapter } from 'src/common/infraestructure/adapters/errorhandle.adapter';
import { ILoggerAdapter } from 'src/common/application/adapters/logger.adapter';
import { LoggerAdapter } from 'src/common/infraestructure/adapters/logger.adapter';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(LoggerAdapter)
    private readonly logger: ILoggerAdapter,

    @Inject(ErrorHandlerAdapter)
    private readonly errorhandler: IErrorHandlerAdapter
  ) { }
  @Post('signin')
  async signIn(@Body() user: UserSigninDto) {
    try {
      return await this.authService.signIn(user);
    } catch (error) {
      this.errorhandler.handleControllerError(this.logger, error)
    }
  }

  @Post('signup')
  async signup(@Body() user: UserSignupDto) {
    try {
      return await this.authService.signUp(user);
    } catch (error) {
      this.errorhandler.handleControllerError(this.logger, error)
    }
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    console.log("google");
  }

  @Get('google-redirect')
  @Redirect()
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Response() res) {
    try {
      const user = res.req.user
      if (!user) throw new Error('Login not successful')

      const { token } = await this.authService.signInGoogle(user)
      return {
        url: process.env.GOOGLE_CLIENT_REDIRECT + `?token=${token}`,
      }
    } catch (error) {
      this.errorhandler.handleControllerError(this.logger, error)
    }
  }

}
