import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.usersRepository.findOne({ where: {email: username} });

    if (!user) {
      throw new NotFoundException('User nije pronadjen');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const { password, ...userWithoutPassword } = user;
      return this.jwtService.sign(userWithoutPassword);
    }

    return null;
  }
}
