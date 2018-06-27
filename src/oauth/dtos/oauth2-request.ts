import {ApiModelProperty} from "@nestjs/swagger";

export class OAuth2Request {
    @ApiModelProperty({type:String,description: 'Email address of the resource owner',required: true})
    email: string;

    @ApiModelProperty({type:String,description: 'Password of the resource owner',required: true})
    password: string;

    @ApiModelProperty({type:String,description: 'Grant type that we are using for authenticate the user',required: true})
    grant_type: string;
}