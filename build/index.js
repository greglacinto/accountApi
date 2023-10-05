"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const oracle_db_1 = __importDefault(require("./database/oracle.db"));
const home_routes_1 = __importDefault(require("./route/home.routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 9020;
const corsOption = { origin: "*" };
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json()); // body parser
app.use((0, cors_1.default)(corsOption));
app.use(home_routes_1.default);
app.use('/', (_req, _res) => {
    _res.status(200).send("server is up");
});
// Add this error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});
app.listen(port, () => {
    console.log(`Account Api server listening on port ${port}`);
    if (!process.env.FI_URL) {
        throw new Error("FI_URL environment variable missing");
    }
    if (!process.env.ORACLE_USER) {
        throw new Error('Oracle user name environment variable missing');
    }
    if (!process.env.ORACLE_PASS) {
        throw new Error('Oracle password environment variable missing');
    }
    if (!process.env.ORACLE_CONN_STR) {
        throw new Error('Oracle conn string environment variable missing');
    }
    try {
        oracle_db_1.default.openConn();
        console.log("Database connection test successful");
    }
    catch (error) {
        throw new Error(error.message);
    }
    finally {
        oracle_db_1.default.closeConn;
        console.log("Database connection close");
    }
});
