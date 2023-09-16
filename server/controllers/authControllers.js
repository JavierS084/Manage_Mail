import User from "../models/userModel.js";

import argon2 from "argon2";

export const Login = async (req, res) => {
    try {

        const userFound = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!userFound) return res.status(404).json({ msg: "Usuario no encontrado" });
        const match = await argon2.verify(userFound.password, req.body.password);
        if (!match) return res.status(400).json({ msg: "Contraseña incorrecta" });
        req.session.userId = userFound.uuid;
        const uuid = userFound.uuid;
        const name = userFound.name;
        const email = userFound.email;
        const role = userFound.role;
        res.status(200).json({ uuid, name, email, role });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const Me = async (req, res) => {
    try {
        
        if (!req.session.userId) {
            return res.status(401).json({ msg: "¡Por favor, ingrese a su cuenta!" });
        }
        const user = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        });
        if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
        res.status(200).json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Can't logout" });
        res.status(200).json({ msg: "You have logged out" });
    });
}