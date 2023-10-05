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
Object.defineProperty(exports, "__esModule", { value: true });
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = extractToken(req);
    const url = process.env.FI_URL;
    const customHeaders = {
        "Content-Type": "application/json",
    };
    const body = {
        "token": token
    };
    try {
        const response = yield fetch(url, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(body)
        });
        if (response.status === 401) {
            return res.status(401).send("Unauthorized access");
        }
        if (response.status === 200) {
            console.log('User Authenticated');
            next();
        }
    }
    catch (error) {
        return next(new Error(`error at fetch to ${url}`));
    }
});
const extractToken = (req) => {
    if (req.headers.authorization
        &&
            req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
};
module.exports = auth;
