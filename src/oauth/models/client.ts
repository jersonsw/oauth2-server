import {Column, Entity, PrimaryColumn} from "typeorm";
import {ApiModelProperty} from "@nestjs/swagger";
import {IsUrl, Length} from "class-validator";


@Entity({schema: 'auth', name: 'clients'})
export class Client {

    @PrimaryColumn({name: 'id', length: 80, nullable: false, default: () => "gen_random_uuid()"})
    id: string;

    @Column({name: 'secret', length: 80, nullable: false, default: () => "gen_random_uuid()"})
    secret: string;

    @ApiModelProperty({type: String, description: 'Name of the client(application)', required: true})
    @Column({name: 'name', length: 20, nullable: false, unique: true})
    @Length(3, 20, {
        message: 'The client name must contain between $constraint1 and $constraint2 characters.$value'
    })
    name: string;

    @Column({
        name: 'grants',
        type: 'simple-array',
        isArray: true,
        nullable: false,
        default: '{authorization_code,password}'
    })
    grants: string[];

    @ApiModelProperty({type: String, description: 'URL when the user will be redirected ', required: true})
    @Column({name: 'redirect_uris', type: 'simple-array', isArray: true, nullable: false})
    @IsUrl({
        require_protocol: true,
        require_valid_protocol: true,
        allow_underscores: true
    }, {each: true, message: '"$value" is not a valid url'})
    redirectUris: string[];

    @Column({length: 500, nullable: false, default: 'read,write'})
    scope: string;

    @Column({name: 'access_token_lifetime', nullable: false, default: 3600})
    accessTokenLifetime: number;

    @Column({name: 'refresh_token_lifetime', nullable: false, default: 7200})
    refreshTokenLifetime: number;

    @Column({type: 'timestamp', name: 'created_on', nullable: false, default: () => 'now()'})
    createdOn: Date;

}