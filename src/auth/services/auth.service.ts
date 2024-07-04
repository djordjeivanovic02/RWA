import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthPayloadDtoRegister } from '../dto/autth-pay-load.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register({ name, surname, email, password }: AuthPayloadDtoRegister) {
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new NotFoundException('Korisnik sa ovim email-om već postoji');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return { token: this.jwtService.sign(userWithoutPassword) };
  }


  async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.usersRepository.findOne({ where: {email: username} });

    if (!user) {
      throw new NotFoundException('User nije pronadjen');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const { password, ...userWithoutPassword } = user;
      return { token: this.jwtService.sign(userWithoutPassword) };
    }

    return null;
  }
}
