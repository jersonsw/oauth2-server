import {BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Client, User} from "./models";
import {DbErrorCode} from "../enums/db-error-code.enum";

@Injectable()
export class OAuthService {

    constructor(@InjectRepository(Client) private readonly clientsRepository: Repository<Client>, @InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    async createClient(client: Client): Promise<Client> {

        try {
            let c: Client = await this.clientsRepository.save(client);
            console.log(c);
            return Promise.resolve(c);
        } catch (e) {
            console.log(e);
            if (e.code) {
                if (DbErrorCode.UNIQUE_VIOLATION == e.code) {
                    throw new BadRequestException("Sorry, already exists an client registered with the same name.");
                } else if (DbErrorCode.NOT_NULL_VIOLATION == e.code || DbErrorCode.CHECK_VIOLATION == e.code || DbErrorCode.STRING_DATA_RIGHT_TRUNCATION == e.code) {
                    throw new BadRequestException("Unable to create the client due to invalid client data.");
                }
            }
            throw new InternalServerErrorException("An unexpected error has occurred trying to create the client.");
        }
    }

    async getClientById(id: string): Promise<Client> {
        let client: Client = await this.clientsRepository.findOneById(id);
        if (!client) {
            throw new NotFoundException("The client was not found");
        }
        return client;
    }

    async updateClient(client: Client): Promise<Client> {
        let updatedClient: Client = await this.clientsRepository.save(client);
        if (!updatedClient) {
            throw new NotFoundException("The client was not found");
        }
        return updatedClient;
    }


    async createUser(user: User): Promise<User> {

        try {
            let u: User = await this.usersRepository.save(user);
            return Promise.resolve(u);
        } catch (e) {
            console.log(e);
            if (e.code) {
                if (DbErrorCode.UNIQUE_VIOLATION == e.code) {
                    throw new BadRequestException("Sorry, already exists an user registered with the same name.");
                } else if (DbErrorCode.NOT_NULL_VIOLATION == e.code || DbErrorCode.CHECK_VIOLATION == e.code || DbErrorCode.STRING_DATA_RIGHT_TRUNCATION == e.code) {
                    console.log(e.code);
                    throw new BadRequestException("Unable to create the user due to invalid user data.");
                }
            }
            throw new InternalServerErrorException("An unexpected error has occurred trying to create the user.");
        }
    }

    async getUserById(id: string): Promise<User> {
        let user: User = await this.usersRepository.findOneById(id);
        if (!user) {
            throw new NotFoundException("The user was not found");
        }
        return user;
    }

    async updateUser(user: User): Promise<User> {
        let updatedUser: User = await this.usersRepository.save(user);
        if (!updatedUser) {
            throw new ConflictException("Unable to update the user");
        }
        return updatedUser;
    }

}