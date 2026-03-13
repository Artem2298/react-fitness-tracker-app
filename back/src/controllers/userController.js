// src/controllers/userController.js
const prisma = require('../lib/prisma');

//  CREATE NEW USER
exports.createUser = async (req, res) => {
  const { first_name, last_name, email, birthday } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { first_name, last_name, email, birthday },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'ERROR with creating of new user' });
  }
};

//  GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'ERROR with getting of new users' });
  }
};

exports.getSpecificUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch {
        res.status(500).json({ error: "Error with getting specific user" })
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json({ message: "User was deleted successfully." })
    } catch {
        res.status(500).json({ error: "ERROR 500 with delet user." })
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, birthday } = req.body

    const updateData = {}

    if (first_name) { updateData.first_name = first_name }
    if (last_name) { updateData.last_name = last_name }
    if (email) { updateData.email = email }
    if (birthday) { updateData.birthday = birthday }

    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData
        })

        if (!user){
            res.status(404).json({ error: "ERROR with updating user. User not found" })
        }
        
        res.status(200).json({ message: "User was updated" })
    } catch {
        res.status(500).json({ error: "ERROR 500 with updating user." })
    }
}