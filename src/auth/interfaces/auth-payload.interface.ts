import { ApiProperty } from "@nestjs/swagger";

export interface AuthPayload {
    username: string;
    password: string;
}

export class UserPasswordSigninDto {
    @ApiProperty({
        example: "admin"
    })
    username: string;

    @ApiProperty({
        example: "admin"
    })
    password: string;
}

export interface GoogleAuthPayload {
    code: string;
}