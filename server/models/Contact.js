const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Le prénom est requis"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Le numéro de téléphone est requis"],
      trim: true,
      validate: {
        validator: function (value) {
          // Basic phone validation (can be adjusted based on your requirements)
          return /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(value);
        },
        message: "Format de numéro de téléphone invalide",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Method to return a safe object (without sensitive data)
contactSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  return {
    id: obj._id,
    firstName: obj.firstName,
    lastName: obj.lastName,
    phone: obj.phone,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
