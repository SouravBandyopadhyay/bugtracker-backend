import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";

const registerAdmin = asyncHandler(async (req, res) => {
  const { adminName, email, password } = req.body;
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(404);
    throw new Error("Admin already exists");
  }
  const admin = await Admin.create({ adminName, email, password });
  if (admin) {
    res.status(201).json({
      _id: admin._id,
      adminName: admin.firstName,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Admin data");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      adminName: admin.adminName,
      email: admin.email,
      adminToken: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      id: admin._id,
      adminName: admin.adminName,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});
export { registerAdmin, loginAdmin, getAdminProfile };
