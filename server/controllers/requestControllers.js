import { createClient } from 'redis';
import dotenv from "dotenv";
import Request from '../models/requestModel.js'

dotenv.config();
const client = createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

client.on('error', err => console.log('Redis Client Error', err));

export const getAllRequests = async (req, res) => {
    try {
        await client.connect();
        // Search Data in Redis
        const reply = await client.get("requests")
        // if exists returns from redis and finish with response
        if (reply) return res.status(200).json({ source: 'cache', data: JSON.parse(reply) });

        const response = await Request.findAll({
            attributes: ['id', 'solicitud'],

        });
        // Saving the results in Redis. The "EX" and 30, sets an expiration of 30 Seconds
        await client.set(
            "requests",
            JSON.stringify(response),
            {
                EX: 30,
            }
        );

        res.status(200).json({ source: 'api', data: response });

    } catch (error) {
        res.json({ message: error.message });
    } finally {
        client.disconnect();
    }
};




export const getRequest = async (req, res) => {
    try {
        const request = await Request.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!request) return res.status(404).json({ msg: "Contenido no encontrado" });
        let response;

        response = await Request.findOne({
            attributes: ['id', 'solicitud'],
            where: {
                id: request.id
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createRequest = async (req, res) => {
    const { solicitud } = req.body;
    try {
        await Request.create({
            solicitud: solicitud
        });
        res.status(201).json({ msg: "El tipo de solicitud se ha creado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}


export const updateRequest = async (req, res) => {
    try {
        const request = await Request.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!request) return res.status(404).json({ msg: "Data not found" });
        const { solicitud } = req.body;

        await Request.update({ solicitud }, {
            where: {
                id: request.id
            }
        });

        res.status(200).json({ msg: "El tipo de solicitud se ha actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const deleteRequest = async (req, res) => {
    try {
        const request = await Request.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!request) return res.status(404).json({ msg: "Data not found" });
        await Request.destroy({
            where: {
                id: request.id
            }
        });
        res.status(200).json({ msg: "El tipo de solicitud se ha eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}
