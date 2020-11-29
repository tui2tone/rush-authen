import { Provider } from "oidc-provider";
import { Config } from "@config/index";
import { OidcSequelizeAdapter } from "@adapters/oidc-postgres";
import { AuthProviderConfig } from "@config/auth-provider";
import { getRepository } from "typeorm";
import { User } from "@users/schemas/user.entity";

const oidcAdapter = OidcSequelizeAdapter;

export const AuthProvider = new Provider(Config.OAUTH_ISSUER, {
    adapter: oidcAdapter,
    ...AuthProviderConfig,
    async findAccount(ctx, id) {
        return {
            accountId: id,
            async claims(use, scope) {
                const userRepo = getRepository(User);
                const user = await userRepo.findOne({
                    uuid: id
                })
                return {
                    sub: id,
                    uuid: user.uuid,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    fullName: user.fullName,
                    profileImgUrl: user.profileImgUrl,
                };
            },
        };
    }
});
AuthProvider.proxy = true;