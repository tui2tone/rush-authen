export interface RegisterDto {
    name: string;
    email: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    cryptedPassword?: string;
}