"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_config_1 = __importDefault(require("../../config/database_config"));
const env_1 = __importDefault(require("../../env"));
const project_model_1 = require("../projects/project_model");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    userType: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["user", "admin", "superadmin"],
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt_1.default.genSaltSync(env_1.default.SALT_ROUNDS);
            const hashedPassword = bcrypt_1.default.hashSync(value, salt);
            this.setDataValue("password", hashedPassword);
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: database_config_1.default,
    modelName: "users",
});
User.hasMany(project_model_1.Project, { sourceKey: "id", as: "projects", foreignKey: "createdBy" });
