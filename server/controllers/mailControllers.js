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

/*const cacheAndRespond = async (keyArray, response, res) => {
    const key = `myArray:${JSON.stringify(keyArray)}`;
    await client.set(key, JSON.stringify(response), { EX: 30 });
    res.status(200).json({ source: 'api', data: response });
  };
*/
const cacheAndRespond = async (key, response, res) => {
    await client.set(key, JSON.stringify(response), { EX: 30 });
    res.status(200).json({ source: 'api', data: response });
};
//Consulta de todos los correos pero sin los detalles
export const getAllMails = async (req, res) => {
    try {


        const response = await Mail.findAll({
            attributes: [
                'id',
                'user',
                'solicitante',
                /*'observation',
                'state',*/
                [Sequelize.fn('date_format', Sequelize.col('dateSolicitud'), '%d-%m-%Y'), 'dateSolicitud'],
                [Sequelize.fn('date_format', Sequelize.col('dateInicial'), '%d-%m-%Y'), 'dateInicial'],
                [Sequelize.fn('date_format', Sequelize.col('dateFinal'), '%d-%m-%Y'), 'dateFinal'],
            ],
            include: [

                {
                    model: Dependency,
                    attributes: ['id', 'dependencia'],
                    required: true,
                },

            ]
        });

        return res.status(200).json(response);

    } catch (error) {
        res.json({ message: error.message });
    }
};
//consulta del correo consus detalles

export const getMailDetail = async (req, res) => {
    let processedRequestsDetail = 0;
    let totalRequestsDetail = 1;
    try {

        await client.connect();
        const reply = await client.get("mailDetail");
        if (reply) {

            const replyObject = JSON.parse(reply);
            if (replyObject.id == req.params.id) {
                console.log(replyObject.id);
                return res.status(200).json({ source: 'cache', data: replyObject });
            }
        }
        //if (reply) return res.status(200).json({ source: 'cache', data: JSON.parse(reply) });
        const mail = await Mail.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!mail) return res.status(404).json({ msg: "Contenido no encontrado" });

        const response = await Mail.findOne({

            attributes: [
                'id',
                'user',
                'solicitante',
                'observation',
                'state',
                [Sequelize.fn('date_format', Sequelize.col('dateSolicitud'), '%d-%m-%Y'), 'dateSolicitud'],
                [Sequelize.fn('date_format', Sequelize.col('dateInicial'), '%d-%m-%Y'), 'dateInicial'],
                [Sequelize.fn('date_format', Sequelize.col('dateFinal'), '%d-%m-%Y'), 'dateFinal'],
            ],
            where: {
                id: mail.id
            },
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
        /*const keyArray = [req.params.id]; // Puedes usar cualquier otro valor del arreglo según sea necesario
  
        cacheAndRespond(keyArray, "mailDetail", response, res);*/
        cacheAndRespond("mailDetail", response, res);

    } catch (error) {
        res.json({ message: error.message });
    } finally {
        // Incrementa el contador de solicitudes procesadas
        processedRequestsDetail++;

        if (processedRequestsDetail === totalRequestsDetail) {
            // Si todas las solicitudes han sido procesadas, cierra el socket
            client.quit();
            totalRequestsDetail++;
        }
    }
};


/**Consulta de correos que ya llegaron a su fecha de expiracion */
export const getMailsExpired = async (req, res) => {
    try {
        await client.connect();
        const reply = await client.get("mailsExpired");
        if (reply) return res.status(200).json({ source: 'cache', data: JSON.parse(reply) });

        const response = await Mail.findAll({
            attributes: [
                'id',
                'user',
                'solicitante',/*
                'observation',
                'state',*/
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


//Consula de 
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

export const createMail = async (req, res) => {
    try {
        const { user, solicitante, state, observation, dateSolicitud, dateInicial, dateFinal, mailTypeId, requestId, dependencyId, groupId } = req.body;

        const mailData = {
            user: user,
            solicitante: solicitante,
            state: state,
            observation: observation || null,
            dateSolicitud: dateSolicitud,
            dateInicial: dateInicial,
            dateFinal: dateFinal || null,
            mailTypeId: mailTypeId,
            requestId: requestId,
            dependencyId: dependencyId,
            groupId: groupId || null
        };

        await Mail.create(mailData);

        res.status(201).json({ msg: "El correo electrónico fue registrado correctamente" });
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
        const { user, solicitante, state, observation, dateSolicitud, dateInicial, dateFinal, mailTypeId, requestId, dependencyId, groupId } = req.body;
        const mailData = {
            user: user,
            solicitante: solicitante,
            state: state,
            observation: observation || null,
            dateSolicitud: dateSolicitud,
            dateInicial: dateInicial,
            dateFinal: dateFinal || null,
            mailTypeId: mailTypeId,
            requestId: requestId,
            dependencyId: dependencyId,
            groupId: groupId || null
        };

        await Mail.update(mailData, {
            where: {
                id: mail.id
            }
        });
        res.status(200).json({ msg: "Mail updated successfuly" });

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

        res.status(200).json({ msg: "El correo fue eliminado correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }

}
