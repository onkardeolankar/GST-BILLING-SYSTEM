const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    po_number: {
      type: String,
      require: true,
    },
    client: {
      type: String,
      require: true,
    },
    invoice_number: {
      type: String,
      require: true,
    },
    gstin: {
      type: String,
      require: true,
    },
    ph: {
      type: Number,
      require: true,
    },
    date_of_issue: {
      type: Date,
      required: true,
    },
    poc: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    trainer_name: {
        type: String,
        require: true,
      },
    trainer_delivery_location: {
        type: String,
        require: true,
      },
    technology: {
        type: String,
        require: true,
      },
    training_dates: {
        type: Date,
        require: true,
      },
    total_duration: {
        type: String,
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

const invoiceDetails = model("invoice_details", invoiceSchema);

module.exports = { invoiceDetails };
