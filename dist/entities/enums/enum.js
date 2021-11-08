"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imagedefault = exports.StatusOrder = exports.StatusPayment = exports.PaymentMethod = exports.UserRole = void 0;
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
    StatusPayment["AWAITINGPAYMENT"] = "Awaiting Payment";
    StatusPayment["VALIDATIONPROCESS"] = "Validation Process";
    StatusPayment["VALIDATIONSUCCESS"] = "Validation Success";
    StatusPayment["PAID"] = "PAID";
    StatusPayment["CANCELED"] = "Cancel";
})(StatusPayment = exports.StatusPayment || (exports.StatusPayment = {}));
var StatusOrder;
(function (StatusOrder) {
    StatusOrder["ORDER"] = "Order";
    StatusOrder["ONGOING"] = "Ongoing";
    StatusOrder["DONE"] = "Done";
})(StatusOrder = exports.StatusOrder || (exports.StatusOrder = {}));
var Imagedefault;
(function (Imagedefault) {
    Imagedefault["IMAGE_DEFAULT"] = "https://res.cloudinary.com/dti2eqvdi/image/upload/v1627998960/profile/No_Image_Available_kvppd7.jpg";
})(Imagedefault = exports.Imagedefault || (exports.Imagedefault = {}));
