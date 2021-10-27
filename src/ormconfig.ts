import { ConnectionOptions } from "typeorm";
import {join} from "path";
import { User } from "./auth/entity/user.entity";


const connectionOptions: ConnectionOptions = {
    type: "postgres",
    url: "postgres://wsuuioeptfnqeg:d519b323fdadf5d6d2f435d04dc5d77daddc79a8c4d044efdcae520a0cdf3e4f@ec2-3-226-211-228.compute-1.amazonaws.com:5432/d6qabm2p48a4am",
    host: "ec2-3-226-211-228.compute-1.amazonaws.com",
    port: 5432,
    username: "wsuuioeptfnqeg",
    password: "d519b323fdadf5d6d2f435d04dc5d77daddc79a8c4d044efdcae520a0cdf3e4f",
    database: "d6qabm2p48a4am"||"postgres",
    entities: [User],
    extra:{
        ssl:{
            rejectUnauthorized: false,
        },
    },
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    logger: "debug",
    migrations: [join(__dirname, "src/migration/**/*.ts")],
};

export = connectionOptions;

