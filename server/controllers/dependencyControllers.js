import Dependencies from '../models/dependencyModel.js'
import { Sequelize } from "sequelize";


export const getAllDependencies = async (req, res) => {
    try {
        let response;
        response = await Dependencies.findAll({
            attributes: ['id', 'dependencia',
            [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'], ],

        });
        console.table(response);
        res.status(200).json(response);

    } catch (error) {
        res.json({ message: error.message });
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
        res.status(201).json({ msg: "Dependency Created Successfuly" });
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
        if (!dependency) return res.status(404).json({ msg: "Data not found" });
        const { dependencia } = req.body;

        await Dependencies.update({ dependencia }, {
            where: {
                id: dependency.id
            }
        });

        res.status(200).json({ msg: "Dependency updated successfuly" });
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
        res.status(200).json({ msg: "Dependency deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}
