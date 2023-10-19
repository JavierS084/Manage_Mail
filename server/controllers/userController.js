import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import argon2 from "argon2";
import nodemailer from "nodemailer";

import User from "../models/userModel.js";

dotenv.config();

function createTransport() {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        },
    });
}


function mailCreateUserNotificationHTML(email, name, password) {
    return `
    <h1>Bienvenido al sistema de Manejador de correo electronico</h1>
    <p> Hola, ${name}</p>
    <p>Hemos recibido tu solicitud de registro en el sistema de gestión de usuarios</p>
    <p>Por favor confirma tu correo electrónico para poder continuar con el proceso</p>
    <p>Correo electrónico: ${email}</p>
    <p>Password: ${password}</p>
    <p>Para confirmar tu correo electrónico haz click en el siguiente enlace</p>
    <a href="http://localhost:3000/api/v1/auth/confirmEmail/${email}">Confirmar correo electrónico</a>
    `
}


function sendEmailNotificationUser(email, name, password) {
    return new Promise((resolve, reject) => {
        const transporter = createTransport();
        const mail_configs = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: "Notificacion de creacion de usuario",
            html: mailCreateUserNotificationHTML(email, name, password),
        };
        transporter.sendMail(mail_configs, (error, info) => {
            if (error) {
                return reject({ msg: `An error has occured: ${error.toString()}` });
            }
            return resolve({ msg: "El email fue enviado correctamente" });
        });
    });
}



export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'id', 'name', 'email', 'role', [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'], 'updatedAt']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    try {

        const { name, email, password, confPassword, role, notification } = req.body;
        if (!name || !email || !password || !confPassword) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios." });
        }
        if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });
        const hashPassword = await argon2.hash(password);
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({ msg: "Usuario registrado correctamente" });

        if (notification) {
            try {
                await sendEmailNotificationUser(email, name, password);
            } catch (error) {
                console.error('No se pudo enviar la notificación por correo electrónico:', error);
            }
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User not found" });
        const { name, email, password, confPassword, role } = req.body;
        let hashPassword;
        if (password === "" || password === null || password === undefined) {
            hashPassword = user.password
        } else {
            hashPassword = await argon2.hash(password);
        }
        if (password !== confPassword) return res.status(400).json({ msg: "La contraseña no coincide con la confirmación de contraseña" });
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "El usuario fue actualizado correctamente" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    try {
        await User.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const resetPassword = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    const { password, confPassword } = req.body;
    let hashPassword;

    if (password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    try {
        if (password !== confPassword) return res.status(400).json({ msg: "La contraseña no coincide con la confirmación de contraseña" });
        await User.update({

            name: user.name,
            email: user.email,
            password: hashPassword,
            role: user.role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "El usuario ha reseteado correctamente su contraseña" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

