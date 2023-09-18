import {DataTypes, Model, ForeignKey} from "sequelize";
import db from "../config/database";
import Bank from "./bank_model";

export enum StatusInquiry {
  Success = "success",
  Pending = "pending",
  Failed = "failed"
}

interface InquiryAttributes {
  kodeRef?: number;
  idBank?: number;
  status?: StatusInquiry;
  ucr?: string;
  uch?: string;
  udcr?: Date;
  udch?: Date;
}

class Inquiry extends Model<InquiryAttributes> implements InquiryAttributes {
  declare kodeRef: number;
  declare idBank: ForeignKey<Bank['idBank']>;
  declare status: StatusInquiry;
  declare ucr: string;
  declare uch: string;
  declare readonly udcr: Date;
  declare readonly udch: Date;
}

Inquiry.init({
  kodeRef: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  idBank: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("success", "pending", "failed"),
    allowNull: false
  },
  ucr: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  uch: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  udcr: {
    type: DataTypes.DATE,
    allowNull: true
  },
  udch: {
    type: DataTypes.DATE,
    allowNull: true
  }
},{
  sequelize: db,
  tableName: "trx_inquiry",
  modelName: "Inquiry",
  underscored: true,
  createdAt: 'udcr',
  updatedAt: 'udch'
});

Bank.hasMany(Inquiry,{
  foreignKey: "idBank",
  as: "inquiry"
})

Inquiry.belongsTo(Bank, {
  foreignKey: "idBank",
  as: "bank"
})

export default Inquiry;

