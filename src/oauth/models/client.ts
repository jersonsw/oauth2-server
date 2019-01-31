import {Column, Entity, PrimaryColumn} from "typeorm";
import {ApiModelProperty} from "@nestjs/swagger";
import {IsUrl, Length, Matches} from "class-validator";

const urlRegex = new RegExp(/^((?:(https?):\/\/)?((?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9]))|(?:(?:(?:\w+\.){1,2}[\w]{2,3})))(?::(\d+))?((?:\/[\w]+)*)(?:\/|(\/[\w]+\.[\w]{3,4})|(\?(?:([\w]+=[\w]+)&)*([\w]+=[\w]+))?|\?(?:(wsdl|wadl))))$/ig);

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
    @Matches(urlRegex, {each: true, message: '"$value" is not a valid url'})
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