"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const database_config_1 = __importDefault(require("../../config/database_config"));
const user_model_1 = require("../users/user_model");
const sequelize_1 = require("sequelize");
class Project extends sequelize_1.Model {
}
exports.Project = Project;
Project.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isFeatured: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    productImage: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    shortDescription: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    productUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
    },
    tags: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
    },
}, {
    timestamps: true,
    sequelize: database_config_1.default,
    modelName: "users",
});
Project.belongsTo(user_model_1.User, { targetKey: "id", as: "owner" });
