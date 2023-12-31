import { createClient } from 'redis';
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import Mail from "../models/mailModel.js";
import MailType from "../models/mailTypeModel.js";
import Dependency from "../models/dependencyModel.js";
import Request from "../models/requestModel.js";
import Group from "../models/groupModel.js";
let totalRequests = 1;
let processedRequests = 0;

dotenv.config();
const client = createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

client.on('error', err => console.log('Redis Client Error', err));

const cacheAndRespond = async (key, response, res) => {
    await client.set(key, JSON.stringify(response), { EX: 30 });
    res.status(200).json({ source: 'api', data: response });
};

export const getAllMails = async (req, res) => {
    try {
        await client.connect();
        const reply = await client.get("mails");
        if (reply) return res.status(200).json({ source: 'cache', data: JSON.parse(reply) });

        const response = await Mail.findAll({
            attributes: [
                'id',
                'user',
                'solicitante',
                [Sequelize.fn('date_format', Sequelize.col('dateSolicitud'), '%d-%m-%Y'), 'dateSolicitud'],
                [Sequelize.fn('date_format', Sequelize.col('dateInicial'), '%d-%m-%Y'), 'dateInicial'],
                [Sequelize.fn('date_format', Sequelize.col('dateFinal'), '%d-%m-%Y'), 'dateFinal'],
            ],
            include: [
                {
                    model: MailType,
                    attributes: ['id', 'tipo'],
                    required: true,
                },
                {
                    model: Dependency,
                    attributes: ['id', 'dependencia'],
                    required: true,
                },
                {
                    model: Request,
                    attributes: ['id', 'solicitud'],
                    required: true,
                },
                {
                    model: Group,
                    attributes: ['id', 'email', 'description'],
                    required: false,
                }
            ]
        });

        cacheAndRespond("mails", response, res);

    } catch (error) {
        res.json({ message: error.message });
    } finally {
        // Incrementa el contador de solicitudes procesadas
        processedRequests++;

        if (processedRequests === totalRequests) {
            // Si todas las solicitudes han sido procesadas, cierra el socket
            client.quit();
            totalRequests++;
        }
    }
};

export const getMailsExpired = async (req, res) => {
    try {
        await client.connect();
        const reply = await client.get("mailsExpired");
        if (reply) return res.status(200).json({ source: 'cache', data: JSON.parse(reply) });

        const response = await Mail.findAll({
            attributes: [
                'id',
                'user',
                'solicitante',
                [Sequelize.fn('date_format', Sequelize.col('dateSolicitud'), '%d-%m-%Y'), 'dateSolicitud'],
                [Sequelize.fn('date_format', Sequelize.col('dateInicial'), '%d-%m-%Y'), 'dateInicial'],
                [Sequelize.fn('date_format', Sequelize.col('dateFinal'), '%d-%m-%Y'), 'dateFinal'],
            ],
            include: [
                {
                    model: MailType,
                    attributes: ['id', 'tipo'],
                    required: true,
                },
                {
                    model: Dependency,
                    attributes: ['id', 'dependencia'],
                    required: true,
                },
                {
                    model: Request,
                    attributes: ['id', 'solicitud'],
                    required: true,
                },
                {
                    model: Group,
                    attributes: ['id', 'email', 'description'],
                    required: false,
                }
            ],
            where: {
                dateFinal: {
                    [Sequelize.Op.lte]: new Date()
                }
            }
        });

        cacheAndRespond("mailsExpired", response, res);

    } catch (error) {
        res.json({ message: error.message });
    } finally {
        // Incrementa el contador de solicitudes procesadas
        processedRequests++;

        if (processedRequests === totalRequests) {
            // Si todas las solicitudes han sido procesadas, cierra el socket
            client.quit();
            totalRequests++;
        }
    }
}

export const getMailUser = async (req, res) => {
    try {
        await client.connect();
        const reply = await client.get("mail-user");
        if (reply) return res.status(200).json({ source: 'cache', data: JSON.parse(reply) });

        const response = await Mail.findAll({
            attributes: ['id', 'user'],
            include: [
                {
                    model: Group,
                    attributes: ['id', 'email', 'description'],
                    order: ['description', 'ASC'],
                    required: true,
                }
            ]
        });

        cacheAndRespond("mail-user", response, res);

    } catch (error) {
        res.json({ message: error.message });
    } finally {

        // Incrementa el contador de solicitudes procesadas
        processedRequests++;

        if (processedRequests === totalRequests) {
            // Si todas las solicitudes han sido procesadas, cierra el socket
            client.quit();
            totalRequests++;
        }
    }

}


/*
export const getAllGroupsMails = async (req, res) => {
    try {
        let response;
        response = await Mail.findAll({
            attributes: [
                'user',
            ],
            include: [
                {
                    model: Group,
                    attributes: ['id', 'email', 'description'],
                    required: true,
                }
            ]
 
        });
        console.table(response);
        res.status(200).json(response);
 
    } catch (error) {
        res.json({ message: error.message });
    }
 
}*/
export const getMail = async (req, res) => {
    try {
        const mail = await Mail.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!mail) return res.status(404).json({ msg: "Contenido no encontrado" });
        let response;

        response = await Mail.findOne({
            attributes: [
                'id',
                'user',
                'solicitante',
                'mailTypeId',
                'requestId',
                'groupId',
                'dependencyId',
                [Sequelize.fn('date_format', Sequelize.col('dateInicial'), '%Y-%m-%d'), 'dateInicial'],
                [Sequelize.fn('date_format', Sequelize.col('dateFinal'), '%Y-%m-%d'), 'dateFinal'],
                [Sequelize.fn('date_format', Sequelize.col('dateSolicitud'), '%Y-%m-%d'), 'dateSolicitud'],
            ],
            where: {
                id: mail.id
            },
            include: [{
                model: MailType,
                attributes: ['tipo'],

                model: Dependency,
                attributes: ['dependencia'],

                model: Request,
                attributes: ['solicitante'],

                model: Group,
                attributes: ['description'],

            }]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const createMail = async (req, res) => {
    try {
        const { user, solicitante, dateSolicitud, dateInicial, dateFinal, mailTypeId, requestId, dependencyId, groupId } = req.body;

        if (dateFinal && groupId) {
            await Mail.create({
                user: user,
                solicitante: solicitante,
                dateSolicitud: dateSolicitud,
                dateInicial: dateInicial,
                dateFinal: dateFinal,
                mailTypeId: mailTypeId,
                requestId: requestId,
                dependencyId: dependencyId,
                groupId: groupId
            });
            res.status(201).json({ msg: "El correo electronico fue registrado correctamente" });

        } else if (!dateFinal && !groupId) {
            await Mail.create({
                user: user,
                solicitante: solicitante,
                dateSolicitud: dateSolicitud,
                dateInicial: dateInicial,
                mailTypeId: mailTypeId,
                requestId: requestId,
                dependencyId: dependencyId,
            });
            res.status(201).json({ msg: "El correo electronico fue registrado correctamente" });
        } else if (!groupId && dateFinal) {
            await Mail.create({
                user: user,
                solicitante: solicitante,
                dateSolicitud: dateSolicitud,
                dateInicial: dateInicial,
                dateFinal: dateFinal,
                mailTypeId: mailTypeId,
                requestId: requestId,
                dependencyId: dependencyId,

            });
            res.status(201).json({ msg: "El correo electronico fue registrado correctamente" });
        } else if (!dateFinal && groupId) {
            await Mail.create({
                user: user,
                solicitante: solicitante,
                dateSolicitud: dateSolicitud,
                dateInicial: dateInicial,
                mailTypeId: mailTypeId,
                requestId: requestId,
                dependencyId: dependencyId,
                groupId: groupId
            });
            res.status(201).json({ msg: "El correo electronico fue registrado correctamente" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}


export const updateMail = async (req, res) => {
    try {
        const mail = await Mail.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!mail) return res.status(404).json({ msg: "Data not found" });
        const { user, solicitante, dateSolicitud, dateInicial, dateFinal, mailTypeId, requestId, dependencyId, groupId } = req.body;
        if (dateFinal && groupId) {

            await Mail.update({ user, solicitante, dateSolicitud, dateInicial, dateFinal, mailTypeId, requestId, dependencyId, groupId }, {
                where: {
                    id: mail.id
                }
            });
            res.status(200).json({ msg: "Mail updated successfuly" });
        } else if (!dateFinal && !groupId) {
            await Mail.update({ user, solicitante, dateSolicitud, dateInicial, mailTypeId, requestId, dependencyId }, {
                where: {
                    id: mail.id
                }
            });
            res.status(200).json({ msg: "Mail updated successfuly" });
        } else if (!groupId && dateFinal) {
            await Mail.update({ user, solicitante, dateSolicitud, dateInicial, dateFinal, mailTypeId, requestId, dependencyId }, {
                where: {
                    id: mail.id
                }
            });
            res.status(200).json({ msg: "Mail updated successfuly" });
        } else if (!dateFinal && groupId) {
            await Mail.update({ user, solicitante, dateSolicitud, dateInicial, mailTypeId, requestId, dependencyId, groupId }, {
                where: {
                    id: mail.id
                }
            });
            res.status(200).json({ msg: "Mail updated successfuly" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const deleteMail = async (req, res) => {
    try {
        const mail = await Mail.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!mail) return res.status(404).json({ msg: "Elemento no encontrado" })

        await mail.destroy({
            where: {
                id: mail.id
            }
        });

        res.status(200).json({ msg: "mail deleted successfuly" });
    } catch (error) {
        res.json({ message: error.message });
    }

}
