import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {Client} from "./models";
import {ApiResponse} from "@nestjs/swagger";
import {OAuthService} from "./oauth.service";

@Controller('/oauth/clients')
export class ClientsController {

    constructor(private readonly oauthService: OAuthService) {}

    @Post('/')
    @ApiResponse({status: 201, description: 'The client was created successfully'})
    @ApiResponse({status: 400, description: 'Invalid client payload'})
    @ApiResponse({status: 409, description: 'The client already exists'})
    @ApiResponse({status: 500, description: 'Internal server error'})
    @ApiResponse({status: 401, description: 'Unauthenticated'})
    public createClient(@Body() client: Client): Promise<Client> {
        return this.oauthService.createClient(client);
    }


    @Get('/:id')
    @ApiResponse({status: 200, description: 'The client was returned successfully'})
    @ApiResponse({status: 404, description: 'The client was not found'})
    @ApiResponse({status: 500, description: 'Internal server error'})
    @ApiResponse({status: 401, description: 'Unauthenticated'})
    public getClientById(@Param('id') id: string): Promise<Client> {
        return this.oauthService.getClientById(id);
    }


    @Put('/:id')
    @ApiResponse({status: 200, description: 'The client was updated successfully'})
    @ApiResponse({status: 404, description: 'The client was not found'})
    @ApiResponse({status: 500, description: 'Internal server error'})
    @ApiResponse({status: 401, description: 'Unauthenticated'})
    public updateClient(@Param('id') id: string, @Body('client') client: Client): Promise<Client> {
        client.id = id;
        return this.oauthService.updateClient(client);
    }

}