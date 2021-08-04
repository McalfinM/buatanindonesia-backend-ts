"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPayment = exports.PaymentMethod = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MEMBER"] = "member";
    UserRole["Seller"] = "seller";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["COD"] = "cash on delivery";
    PaymentMethod["BANKTRANSFER"] = "Bank Transfer";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
var StatusPayment;
(function (StatusPayment) {
    StatusPayment["ORDER"] = "Order";
    StatusPayment["AWAITINGPAYMENT"] = "Awaiting Payment";
    StatusPayment["PAID"] = "PAID";
    StatusPayment["CANCELED"] = "Cancel";
})(StatusPayment = exports.StatusPayment || (exports.StatusPayment = {}));
