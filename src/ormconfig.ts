import { ConnectionOptions } from "typeorm";
import {join} from "path";
import { User } from "./auth/entity/user.entity";

const config = {
    host: "localhost",
    user: "postgres",
    password: "root",
    database: "postgres",
};

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: config.user,
    password: config.password,
    database: config.database || "postgres",
    entities: [User],
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    logger: "debug",
    migrations: [join(__dirname, "src/migration/**/*.ts")],
};

export = connectionOptions;

