import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreatePostDTO } from '../dto/create-post.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getUsers(): Promise<User[]> {
        const posts = await this.userModel.find().exec();
        return posts;
    }

    async getUser(postID): Promise<User> {
        const post = await this.userModel
            .findById(postID)
            .exec();
        return post;
    }

    async addPost(createPostDTO: CreatePostDTO): Promise<User> {
        const newPost = await this.userModel(createPostDTO);
        return newPost.save();
    }

    async editUser(postID, createPostDTO: CreatePostDTO): Promise<User> {
        const editedPost = await this.userModel
            .findByIdAndUpdate(postID, createPostDTO, { new: true });
        return editedPost;
    }

    async deletePost(postID): Promise<any> {
        const deletedPost = await this.userModel
            .findByIdAndRemove(postID);
        return deletedPost;
    }

}
