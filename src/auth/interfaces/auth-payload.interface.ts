import { ApiProperty } from "@nestjs/swagger";

export class UserPasswordSigninDto {
    @ApiProperty({
        example: "admin",
        description: "username or email"
    })
    username: string;

    @ApiProperty({
        example: "xxxxx"
    })
    password: string;
    cryptedPassword?: string;
}

export interface GoogleAuthPayload {
    code: string;
    state: string;
    access_token: string;
    id_token: string;
}