"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const new_user_1 = __importDefault(require("../services/new-user"));
const user_data_1 = __importDefault(require("../validators/user-data"));
const router = (0, express_1.Router)();
router.post('/', user_data_1.default, async (req, res) => {
    try {
        const response = await (0, new_user_1.default)(req.body.user);
        if (response.error) {
            throw new Error(response.error.message);
        }
        res.send(response);
    }
    catch (error) {
        console.error(error);
        //FIXME dev only! stop sending entire error messages to the client and improve custom messages
        res.status(error.code || 503).send({ error: error.message });
    }
});
exports.default = router;
