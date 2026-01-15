const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medicineapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const medicineSchema = new mongoose.Schema({
  name: String,
  price: Number,
  mrp: Number,
  manufacturer: String,
  pack: String,
  composition: String,
  description: String,
  stock: String,
  category: String,
});

const mongodMedicine = mongoose.model('Medicine', medicineSchema);

// API to get all medicines
app.get('/api/medicines', async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
});

// API to add a medicine (for admin/testing)
app.post('/api/medicines', async (req, res) => {
  const medicine = new Medicine(req.body);
  await medicine.save();
  res.status(201).json(medicine);
});

app.listen(3001, () => {
  console.log('Backend server running on http://localhost:3001');
});
