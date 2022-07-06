"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accounts_1 = __importDefault(require("./controllers/accounts"));
const register_deposit_1 = __importDefault(require("./controllers/register-deposit"));
const register_transfer_1 = __importDefault(require("./controllers/register-transfer"));
const register_user_1 = __importDefault(require("./controllers/register-user"));
const register_withdraw_1 = __importDefault(require("./controllers/register-withdraw"));
const statements_1 = __importDefault(require("./controllers/statements"));
const transactions_1 = __importDefault(require("./controllers/transactions"));
const users_1 = __importDefault(require("./controllers/users"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.use('/accounts', accounts_1.default);
app.use('/register-deposit', register_deposit_1.default);
app.use('/register-transfer', register_transfer_1.default);
app.use('/register-user', register_user_1.default);
app.use('/register-withdraw', register_withdraw_1.default);
app.use('/statements', statements_1.default);
app.use('/transactions', transactions_1.default);
app.use('/users', users_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
