const prisma = require("../db/prisma");

const { validationResult } = require("express-validator");

const PandRegioController = {
    findAll: async (req, res) => {
        try {
            const result = await prisma.PandRegio.findMany({   
                include: {
                    regio: true,
                    pand: true
                }
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
            const result = await prisma.PandRegio.findUnique({
                where: {
                    id: parseInt(id),
                },
                include: {
                    regio: true,
                    pand: true
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
                const tp = await prisma.PandRegio.create({
                    data: {
                        pandId: result.pandId,
                        regioId: result.regioId
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
                const tp = await prisma.PandRegio.update({
                    where: {
                        id: result.id,
                      },
                      data: {
                        pandId: result.pandId,
                        regioId: result.regioId
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
            const result = await prisma.PandRegio.delete({
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

module.exports = PandRegioController;