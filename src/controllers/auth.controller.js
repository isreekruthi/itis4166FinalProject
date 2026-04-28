import * as service from '../services/auth.service.js';

export const signup = async (req, res) => {
  try {
    const user = await service.signup(req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await service.login(
      req.body.email,
      req.body.password
    );
    res.json({ token });
  } catch {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};