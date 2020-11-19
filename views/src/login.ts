
import { UserManager, User } from 'oidc-client';

function mgrInit() {
    // Get Config
    const mgr = new UserManager(this.env.config);
}

mgrInit()