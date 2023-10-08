const { Schema, model } = require("mongoose");

const BankDetailsSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    beneficiary_name: {
      type: String,
      require: true,
    },
    account_number: {
      type: String,
      required: true,
    },
    ifsc_code: {
      type: String,
      require: true,
    },
    address: {
      type: Object,
      require: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const BankDetails = model("bank_details", BankDetailsSchema);

module.exports = { BankDetails };
