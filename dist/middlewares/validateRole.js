"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = void 0;
const validateRole = (availableRoles) => (err, _req, res, next) => {
    const currentUser = res.locals.user;
    if (!currentUser)
        return res.sendStatus(403);
    //check if the current user logged role matches the validateRole middleware
    if (!availableRoles.includes(currentUser.userType))
        return res.send(403).json({ msg: "User does not have sufficient role access" });
    return next();
};
exports.validateRole = validateRole;
