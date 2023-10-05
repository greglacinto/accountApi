"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceEnquiry = void 0;
const oracle_db_1 = __importDefault(require("../database/oracle.db"));
const query_db_1 = require("../database/query.db");
function BalanceEnquiry(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const { foracid } = req.body;
        try {
            // Establish a database connection
            const connection = yield oracle_db_1.default.openConn();
            console.log(query_db_1.balanceEnquiryQuery);
            // Execute an SQL query (replace 'YOUR_QUERY' with your actual SQL query)
            const result = yield connection.execute(query_db_1.balanceEnquiryQuery, [foracid]);
            // close database connection
            yield connection.close();
            if (((_a = result.rows) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                res.status(200).send({
                    "status": "404",
                    "message": `No record found for ${foracid}`
                });
            }
            else {
                const acctBal = (_b = result.rows) === null || _b === void 0 ? void 0 : _b.map((item) => {
                    return item[0];
                });
                console.log((_c = result.rows) === null || _c === void 0 ? void 0 : _c.length, acctBal);
                res.status(200).send({
                    "status": "200",
                    "message": {
                        "foracid": foracid,
                        "name": acctBal
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            throw new Error('Error while interacting with database');
        }
    });
}
exports.BalanceEnquiry = BalanceEnquiry;
