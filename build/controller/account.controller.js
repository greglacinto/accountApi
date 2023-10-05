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
exports.AccountEnquiry = void 0;
const oracle_db_1 = __importDefault(require("../database/oracle.db"));
function AccountEnquiry(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { foracid } = req.body;
        try {
            console.log("===== Going to database =====");
            // Establish a database connection
            const connection = yield oracle_db_1.default.openConn();
            // Execute an SQL query (replace 'YOUR_QUERY' with your actual SQL query)
            const query = `
      select gam.acct_name, gam.cif_id, phone.PHONENUMBER, email.EMAILID 
      FROM TBAADM.GAM gam, CIF.PHONEDETAIL phone, CIF.EMAILDETAIL email 
      where gam.foracid = :id
      and gam.cif_id = phone.cifid and gam.cif_id = email.cifid AND ROWNUM=1
    `;
            const result = yield connection.execute(query, [foracid]);
            // close database connection
            yield connection.close();
            console.log("===== Closed database connection =====");
            if (((_a = result.rows) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                console.log(" No record found");
                res.status(200).send({
                    "status": "404",
                    "message": `No record found for ${foracid}`
                });
            }
            else {
                const acctBal = (_b = result.rows) === null || _b === void 0 ? void 0 : _b.map((item) => {
                    console.log(item);
                    let tempData = {
                        account: foracid,
                        name: item[0],
                        cif: item[1],
                        phone: item[2],
                        email: item[3]
                    };
                    return tempData;
                });
                res.status(200).send({
                    "status": "200",
                    "message": acctBal
                });
            }
        }
        catch (error) {
            console.log(error);
            throw new Error('Error while interacting with database');
        }
    });
}
exports.AccountEnquiry = AccountEnquiry;
