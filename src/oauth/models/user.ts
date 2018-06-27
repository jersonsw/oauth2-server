import {Column, Entity, PrimaryColumn} from "typeorm";
import {BaseEntity} from "./base.entity";
import {IsEmail, Length, Matches} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger";

@Entity({schema: 'auth', name: 'users'})
export class User extends BaseEntity {

    @PrimaryColumn({nullable: false, primary: true, length: 80, default: () => "gen_random_uuid()"})
    id: string;

    @ApiModelProperty({type: String, description: 'User email', required: true})
    @IsEmail({allow_display_name: true}, {
        message: '$value is not a valid email'
    })
    @Column({unique: true, nullable: false, length: 30})
    email: string;

    @ApiModelProperty({type: String, description: 'First Name of the user', required: true})
    @Length(3, 20, {message: 'The First Name must have between 3 and 20 characters'})
    @Column({name: 'first_name', nullable: false, length: 20})
    firstName: string;

    @ApiModelProperty({type: String, description: 'Last Name of the user', required: true})
    @Length(3, 20, {message: 'The Last Name must have between 3 and 20 characters'})
    @Column({name: 'last_name', nullable: false, length: 20})
    lastName: string;

    @ApiModelProperty({type: String, description: 'User password', required: true})
    @Matches(/^[^\s\n\t\r]{6,16}$/, 'gi', {
        message: 'The password must contain between 6 and 16 characters'
    })
    @Column({nullable: false, length: 16})
    password: string;

    @Column({nullable: false, length: 500, default: 'read,write'})
    scope: string;

    @Column({name: 'email_verified', nullable: false, default: false})
    emailVerified: boolean;

    @Column({nullable: false, length: 1, default: 'A'})
    status: string;
}