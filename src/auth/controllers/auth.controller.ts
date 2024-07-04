import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthPayloadDtoRegister } from '../dto/autth-pay-load.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() authPayloadDto: AuthPayloadDtoRegister) {
    try {
      const result = await this.authService.register(authPayloadDto);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
