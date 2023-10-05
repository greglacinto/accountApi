"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_controller_1 = require("../controller/test.controller");
const name_controller_1 = require("../controller/name.controller");
const balance_controller_1 = require("../controller/balance.controller");
const account_controller_1 = require("../controller/account.controller");
const auth = require('../middleware/auth');
class HomeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/test', test_controller_1.Test);
        this.router.post('/account/name-enquiry', auth, name_controller_1.NameEnquiry);
        this.router.post('/account/balance-enquiry', auth, balance_controller_1.BalanceEnquiry);
        this.router.post('/account/enquiry', auth, account_controller_1.AccountEnquiry);
    }
}
exports.default = new HomeRoutes().router;
