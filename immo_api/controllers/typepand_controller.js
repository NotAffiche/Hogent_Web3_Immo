const prisma = require("../db/prisma");

const { validationResult } = require("express-validator");

const TypePandController = {
    findAll: async (req, res) => {
        try {
            const result = await prisma.TypePand.findMany({   
            });
            res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            res.status(500);
        }
    },
    findById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await prisma.TypePand.findUnique({
                where: {
                    id: parseInt(id),
                }
            })
            res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            res.status(500);
        }
    },
    create: async (req, res) => {
        try {
            const valResult = validationResult(req);

            if (!valResult.errors.length) {
                const result = req.body;
                const tp = await prisma.TypePand.create({
                    data: {
                        naam: result.naam
                    }
                });
                res.status(200).json(tp);
            } else {
                res.status(500).json(valResult.errors);
            }
        }
        catch (err) {
            console.error(err);
            res.status(500);
        }
    },
    update: async (req, res) => {
        try {
            const valResult = validationResult(req);

            if (!valResult.errors.length) {
                const result = req.body;
                //const { id } = req.params;
                const tp = await prisma.TypePand.update({
                    where: {
                        id: result.id,
                      },
                      data: {
                        naam: result.naam,
                        updatedAt: new Date()
                      },
                });
                res.status(200).json(tp);
            } else {
                res.status(500).json(valResult.errors);
            }
        }
        catch (err) {
            console.error(err);
            res.status(500);
        }
    },
    deleteById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await prisma.TypePand.delete({
                where: {
                    id: parseInt(id),
                }
            })
            res.status(200).json(`Deleted id:${id.toString()}`);
        }
        catch (err) {
            console.error(err);
            res.status(500);
        }
    }
};

module.exports = TypePandController;