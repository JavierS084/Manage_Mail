import { createClient } from 'redis';
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import Dependencies from '../models/dependencyModel.js'

dotenv.config();
const client = createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

client.on('error', err => console.log('Redis Client Error', err));

export const getAllDependencies = async (req, res) => {
    try {
        await client.connect();
        // Search Data in Redis
        const reply = await client.get("dependencies")
        // if exists returns from redis and finish with response
        if (reply) return res.status(200).json({ source: 'cache', data: JSON.parse(reply) });
        let response;
        response = await Dependencies.findAll({
            attributes: ['id', 'dependencia',
                [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'],],

        });
        // Saving the results in Redis. The "EX" and 30, sets an expiration of 30 Seconds
        await client.set(
            "dependencies",
            JSON.stringify(response),
            {
                EX: 40,
            }
        );
        res.status(200).json({ source: 'api', data: response });

    } catch (error) {
        res.json({ message: error.message });
    } finally {
        client.disconnect();
    }

}

export const getDependency = async (req, res) => {
    try {
        const dependency = await Dependencies.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!dependency) return res.status(404).json({ msg: "Contenido no encontrado" });
        let response;

        response = await Dependencies.findOne({
            attributes: ['id', 'dependencia'],
            where: {
                id: dependency.id
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createDependency = async (req, res) => {
    const { dependencia } = req.body;
    try {
        await Dependencies.create({
            dependencia: dependencia
        });
        res.status(201).json({ msg: "La dependencia se ha creado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}


export const updateDependency = async (req, res) => {
    try {
        const dependency = await Dependencies.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!dependency) return res.status(404).json({ msg: "Contenido no encontrado" });
        const { dependencia } = req.body;

        await Dependencies.update({ dependencia }, {
            where: {
                id: dependency.id
            }
        });

        res.status(200).json({ msg: "La dependencia se ha actualizando correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const deleteDependency = async (req, res) => {
    try {
        const dependency = await Dependencies.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!dependency) return res.status(404).json({ msg: "Data not found" });
        await Dependencies.destroy({
            where: {
                id: dependency.id
            }
        });
        res.status(200).json({ msg: "La dependencia se ha eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}
