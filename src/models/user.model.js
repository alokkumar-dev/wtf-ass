const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
      id: {
      type: String,
      unique: true,
      required: true,
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    mobile: { type: Number, required: true, maxLength: 10, minLength: 10 },
    roles: {
      type: [
        {
          type: String,
          enum: ["admin", "member", "trainer"],
        },
      ],
      default: ["admin"],
      required: true,
    },
    status: {
      type: [
        {
          type: String,
          enum: ["active", "inactive"],
        },
      ],
      default: ["active"],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// hash the password before saving it to the database
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  next();
});

// compare the password with the hash password for login
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
