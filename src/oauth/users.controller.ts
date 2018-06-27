import {Body, Controller, Get, Param, Post, Put, Req} from "@nestjs/common";
import {ApiResponse} from "@nestjs/swagger";
import {User} from "./models";
import {OAuthService} from "./oauth.service";

@Controller('/oauth/users')
export class UsersController {

    constructor(private readonly oauthService: OAuthService) {}

    @Post('/')
    @ApiResponse({status: 201, description: 'The user was created successfully'})
    @ApiResponse({status: 400, description: 'Invalid user payload'})
    @ApiResponse({status: 409, description: 'The user already exists'})
    @ApiResponse({status: 500, description: 'Internal server error'})
    @ApiResponse({status: 401, description: 'Unauthenticated'})
    public createUser(@Body() user: User, @Req() req): Promise<User> {
        user.createdFrom = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        return this.oauthService.createUser(user);
    }

    @Get('/:id')
    @ApiResponse({status: 200, description: 'The user was returned successfully'})
    @ApiResponse({status: 404, description: 'The user was not found'})
    @ApiResponse({status: 500, description: 'Internal server error'})
    @ApiResponse({status: 401, description: 'Unauthenticated'})
    public getUserById(@Param('id') id: string): Promise<User> {
        return this.oauthService.getUserById(id);
    }


    @Put('/:id')
    @ApiResponse({status: 200, description: 'The user was updated successfully'})
    @ApiResponse({status: 404, description: 'The user was not found'})
    @ApiResponse({status: 500, description: 'Internal server error'})
    @ApiResponse({status: 401, description: 'Unauthenticated'})
    public updateUser(@Param('id') id: string, @Body('user') user: User): Promise<User> {
        user.id = id;
        return this.oauthService.updateUser(user);
    }
}