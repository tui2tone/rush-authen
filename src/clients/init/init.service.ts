import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class InitService implements OnModuleInit {

    private readonly logger = new Logger("Trigger Module");

    constructor(
        @InjectEntityManager()
        private readonly manager: EntityManager
    ) {

    }

    async onModuleInit() {
        await this.setupClientSyncToProviderDB()
    }

    async setupClientSyncToProviderDB() {

        const createTrigger = `
            DROP TRIGGER IF EXISTS trigger_client_to_oauth_provider on "app_clients";

            CREATE TRIGGER trigger_client_to_oauth_provider
            AFTER UPDATE OR INSERT OR DELETE
            ON "app_clients"
            FOR STATEMENT
            EXECUTE PROCEDURE update_client_to_oauth_provider();`
        
        const updateSql = `
            DELETE FROM "Clients";

            INSERT INTO "Clients" (id, data, "createdAt", "updatedAt")
            select id, row_to_json(row), now(), now()
            from (
                select id, name, client_id, client_secret FROM app_clients
            ) row;
        `

        const createProdecure = `
            CREATE OR REPLACE FUNCTION update_client_to_oauth_provider()
            RETURNS trigger AS
            $$
            BEGIN
                ${updateSql}
            RETURN NEW;
            END;
            $$
            LANGUAGE 'plpgsql';
        `

        await this.manager.query(createProdecure);
        await this.manager.query(createTrigger);
        await this.manager.query(updateSql);

        this.logger.log("update_client_to_oauth_provider created ✅")
    }
}