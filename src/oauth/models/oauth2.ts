import OAuth2Server = require("oauth2-server");
import {getRepository} from "typeorm";
import {Client} from "./client";
import {User, User as UserEntity} from "./user";
import {AccessToken} from "./access-token";

export const oauth2Model = {

    getClient: async (clientId: string, clientSecret: string): Promise<Client | '' | 0 | false | null | undefined> => {
        let client: Client = await getRepository(Client)
            .createQueryBuilder('c')
            .where('c.id = :clientId AND c.secret = :clientSecret', {
                clientId: clientId,
                clientSecret: clientSecret
            }).getOne();
        if (!client) {
            return Promise.reject("The combination of client id and client secret are incorrect");
        }
        return Promise.resolve(client);

    },
    saveToken: async (token: AccessToken, client: Client, user: User): Promise<AccessToken | '' | 0 | false | null | undefined> => {
        token.client = client;
        token.clientId = client.id;
        token.user = user;
        token.userId = user.id;
        token.createdFrom = '';
        let bearer = await getRepository(AccessToken).save(token);
        if (!bearer) {
            return Promise.reject("Unable to create the token");
        }
        return Promise.resolve(bearer);
    },

    getAccessToken: async (accessToken: string): Promise<AccessToken> => {
        let token: AccessToken = await getRepository(AccessToken)
            .createQueryBuilder('at')
            .where('at.access_token = :accessToken', {accessToken: accessToken}).getOne();
        if (!token) {
            return Promise.reject("Token not found");
        }
        return Promise.resolve(token);
    },

    verifyScope: async (token: OAuth2Server.Token, scope: string): Promise<boolean> => {
        return true;
    },

    getUser: async (email: string, password: string): Promise<User | '' | 0 | false | null | undefined> => {
        let user: UserEntity = await getRepository(UserEntity).createQueryBuilder('u').where('u.email = :email AND u.password = :password', {
            email: email,
            password: password
        }).getOne();
        if (!user) {
            return Promise.reject("User not found");
        }
        return Promise.resolve(user);
    }
};