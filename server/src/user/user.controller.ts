import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreatePostDTO } from '../dto/create-post.dto';
import { ValidateObjectId } from '../pipes/validate-object-id.pipes';


@Controller('blog')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(posts);
    }

    @Get('post/:postID')
    async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        const post = await this.userService.getUser(postID);
        if (!post) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json(post);

    }

    @Post('/post')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.userService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    }
}
