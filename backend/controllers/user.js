import User from "../models/user.js";

export const countUserByRole = async (req, res) => {
  try {
    const superadmin = await User.count({ where: { role: "superadmin" } });
    const supervisor = await User.count({ where: { role: "supervisor" } });
    const officer = await User.count({ where: { role: "officer" } });
    res.json({ superadmin, supervisor, officer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const data = await User.create(req.body);
    res.status(201).json({ msg: "User berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const data = await User.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, { where: { user_id: req.params.id } });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { user_id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const data = await User.create(req.body);
    res.status(201).json({ message: "Register success", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.password !== password) return res.status(401).json({ error: "Invalid password" });
    // Token dummy, ganti dengan JWT jika perlu
    res.json({ message: "Login success", token: "dummy-token", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 