import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreatePostDTO } from '../dto/create-post.dto';
import { RegisterDTO } from '../dto/register.dto';
import { ValidateObjectId } from '../pipes/validate-object-id.pipes';


@Controller('/api/user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/auth')
    async auth(@Res() res, @Body() registerDTO: RegisterDTO) {
        const newUser = await this.userService.addUser(registerDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newUser
        })
    }
}
