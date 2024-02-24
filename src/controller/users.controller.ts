import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Get,
  Req,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { SignupDto } from '../dto/signup.dto';
import { Users } from 'src/entity/users.entity';
import { LoginDto } from 'src/dto/login.dto';
import { SignoutDto } from 'src/dto/signout.dto';
import { UpdateDto } from 'src/dto/update.dto';
import { AuthGuard, Roles } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @UseGuards(AuthGuard)
  @Roles('admin')
  signup(@Body() signupDto: SignupDto): Promise<Users> {
    try {
      return this.usersService.signup(signupDto);
    } catch (err) {
      throw err;
    }
  }

  @Post('login')
  login(@Req() req, @Body() loginDto: LoginDto): Promise<string> {
    try {
      return this.usersService.login(req, loginDto);
    } catch (err) {
      throw err;
    }
  }
  @Delete('signout')
  @UseGuards(AuthGuard)
  @Roles('admin')
  signout(@Req() req, @Body() signoutDto: SignoutDto): Promise<string> {
    try {
      return this.usersService.signout(req, signoutDto);
    } catch (err) {
      throw err;
    }
  }
  @Patch()
  @UseGuards(AuthGuard)
  @Roles('admin', 'tutor')
  update(@Req() req, @Body() updateDto: UpdateDto): Promise<string> {
    try {
      return this.usersService.update(req, updateDto);
    } catch (err) {
      throw err;
    }
  }

  @Post('logout')
  logout(@Req() req): Promise<string> {
    try {
      return this.usersService.logout(req);
    } catch (err) {
      throw err;
    }
  }
  @Get('list')
  @UseGuards(AuthGuard)
  @Roles('admin')
  listMember(@Query('page') page: number) {
    try {
      return this.usersService.listMember(page);
    } catch (err) {
      throw err;
    }
  }
  @Get('/mystudents')
  @UseGuards(AuthGuard)
  @Roles('tutor')
  listMyStudents(@Query() paginationQuery) {
    try {
      const { page, mainTutor } = paginationQuery;
      return this.usersService.listMyStudents(page, mainTutor);
    } catch (err) {
      throw err;
    }
  }
  @Get('member:id')
  @UseGuards(AuthGuard)
  @Roles('member', 'admin', 'tutor')
  findOneMember(@Param('id') id: string) {
    try {
      return this.usersService.findOneMember(id);
    } catch (err) {
      throw err;
    }
  }

  @Get('count')
  @UseGuards(AuthGuard)
  @Roles('admin')
  findEndLeftMember(@Query('left') left: number) {
    try {
      return this.usersService.findEndLeftMember(left);
    } catch (err) {
      throw err;
    }
  }
}
