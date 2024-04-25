const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  appDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  userName:{
    type: String,
    required:[true, "Please add User's name"]
},
  dentist: {
    type: mongoose.Schema.ObjectId,
    ref: "Dentist",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  messageToDentist: {
    type: String
  }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
