import { Provider } from "oidc-provider";
import { Config } from "@config/index";
import { OidcSequelizeAdapter } from "@adapters/oidc-postgres";
import { AuthProviderConfig } from "@config/auth-provider";

const oidcAdapter = OidcSequelizeAdapter;

export const AuthProvider = new Provider(Config.OAUTH_ISSUER, {
    // adapter: oidcAdapter,
    ...AuthProviderConfig
});