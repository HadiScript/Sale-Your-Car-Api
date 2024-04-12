import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { updateUserDto } from './dtos/update-user.dtp';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { userDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { currentUser } from './decorators/current-user.dec';
import { User } from './users.entities';
import { authGuard } from 'src/guards/auth.guard';




@Controller('auth')
@serialize(userDto)
export class UsersController {

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) { }


  // @Get('/who')
  // who(@Session() session: any) {
  //   return this.userService.findOne(session.userId)
  // }

  @Get('/who')
  @UseGuards(authGuard)
  who(@currentUser() user: User) {
    return user;
  }


  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }


  @Post('/signup')
  async createUser(@Body() user: createUserDto, @Session() session: any) {

    // console.log(user);
    // return this.userService.create(user.email, user.password);

    const _user = await this.authService.signup(user.email, user.password)

    session.userId = _user.id;
    return _user;
  }

  @Post('/signin')
  async signin(@Body() user: createUserDto, @Session() session: any) {
    const _user = await this.authService.signin(user.email, user.password)
    session.userId = _user.id;
    return _user;
  }

  @Get()
  find(@Query('email') email: string) {
    return this.userService.find(email)
  }


  @Get('/:id')
  async findUser(@Param('id') id: string) {
    // console.log('in the fun');

    const user = await this.userService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }


  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

}
