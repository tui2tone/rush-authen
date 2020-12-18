import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsersSchema1608308206360 implements MigrationInterface {
    name = 'createUsersSchema1608308206360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "additional-fields" ("id" SERIAL NOT NULL, "group" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "isSynced" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_eba0752e64146e044aea6f08a36" UNIQUE ("group", "name"), CONSTRAINT "PK_2f4400ce24c5f38af9d6a83b76f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "is_primary" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "project_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f4f2789197a3cbbc0182396b264" UNIQUE ("name", "project_id"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("id" SERIAL NOT NULL, "user_id" integer, "role_id" integer NOT NULL, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying, "uuid" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "username" character varying, "crypted_password" character varying, "is_owner" boolean NOT NULL DEFAULT false, "profileImgUrl" character varying, "google_user_id" character varying, "line_user_id" character varying, "facebook_user_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_951b8f1dfc94ac1d0301a14b7e1" UNIQUE ("uuid"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_sessions" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "token" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1cf3cd4b3554ca6e66507833276" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_clients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "client_id" character varying NOT NULL, "client_secret" character varying, "application_type" character varying DEFAULT 'web', "token_endpoint_auth_method" character varying DEFAULT 'none', "redirect_uris" jsonb, "post_logout_redirect_uris" jsonb, "grant_types" jsonb, "project_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_323279eea93bbed87d746028081" UNIQUE ("name"), CONSTRAINT "PK_f61116c55387886fdb83aef8312" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "oauth_providers" ("id" SERIAL NOT NULL, "method" character varying NOT NULL, "name" character varying NOT NULL, "authority" character varying, "redirect_uri" character varying, "response_type" character varying, "scope" character varying, "is_enabled" boolean NOT NULL DEFAULT false, "is_supported" boolean NOT NULL DEFAULT false, "is_passwordless_enabled" boolean NOT NULL DEFAULT false, "client_id" character varying, "client_secret" character varying, "order_no" integer NOT NULL DEFAULT '0', "is_password_less" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_157c7ea720763a3121cb86c1b15" UNIQUE ("method"), CONSTRAINT "PK_80f70fba4177502d50482d9735b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "site_url" character varying, "site_name" character varying, "mandatory_field" character varying NOT NULL DEFAULT 'email', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ca7857276d2a30f4dcfa0e42cd4" UNIQUE ("name"), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_cb48212dfe65dfe431d486034d2" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_sessions" ADD CONSTRAINT "FK_510208026848a56d2f38b918639" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_clients" ADD CONSTRAINT "FK_2951658837a5be6d99bf7280f59" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_clients" DROP CONSTRAINT "FK_2951658837a5be6d99bf7280f59"`);
        await queryRunner.query(`ALTER TABLE "app_sessions" DROP CONSTRAINT "FK_510208026848a56d2f38b918639"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_cb48212dfe65dfe431d486034d2"`);
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`DROP TABLE "oauth_providers"`);
        await queryRunner.query(`DROP TABLE "app_clients"`);
        await queryRunner.query(`DROP TABLE "app_sessions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "additional-fields"`);
    }

}
