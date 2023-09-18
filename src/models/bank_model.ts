import { DataTypes, Model, Optional } from "sequelize";
import db from "../config/database";

export enum StatusActive {
  NonActive = "0",
  Active = "1",
}

interface BankAttributes {
  idBank?: number;
  namaBank: string;
  active: StatusActive;
}

type BankCreationAttributes = Optional<BankAttributes, 'idBank'>

class Bank
  extends Model<BankAttributes, BankCreationAttributes>
  implements BankAttributes
{
  declare idBank: number;
  declare namaBank: string;
  declare active: StatusActive;
}

Bank.init(
  {
    idBank: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    namaBank: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    active: {
      type: DataTypes.ENUM("0", "1"),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "ref_bank",
    modelName: "Bank",
    underscored: true,
    timestamps: false
  }
);

export default Bank;
