import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import {User} from "./user";
import {Client} from "./client";

@Entity({schema: 'auth', name: 'tokens'})
export class AccessToken {

    @PrimaryColumn({
        name: 'access_token',
        primary: true,
        nullable: false,
        length: 80,
        default: () => "gen_random_uuid()"
    })
    accessToken: string;

    @Column({
        name: 'refresh_token',
        unique: true,
        nullable: false,
        length: 80,
        default: () => "gen_random_uuid()"
    })
    refreshToken: string;

    @Column('timestamp', {name: 'access_token_expires_at', nullable: false})
    accessTokenExpiresAt: Date;

    @Column('timestamp', {name: 'refresh_token_expires_at', nullable: false})
    refreshTokenExpiresAt: Date;

    @OneToOne(type => Client)
    @JoinColumn({name: 'client_id', referencedColumnName: 'id'})
    client: Client;

    @Column({name: 'client_id', nullable: false, length: 80})
    clientId: string;

    @OneToOne(type => User)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @Column({name: 'user_id', nullable: false, length: 80})
    userId: string;

    @Column({nullable: false, length: 500, default: 'read,write'})
    scope: string;


    @Column('timestamp', {name: 'created_on', nullable: false, default: () => 'now()'})
    createdOn: Date;

    @Column({name: 'created_from', nullable: true})
    createdFrom: string;

}