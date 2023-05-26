const prisma = require("../db/prisma");

const { validationResult } = require("express-validator");

const AfbeeldingController = {
    findAll: async (req, res) => {
        try {
            const result = await prisma.Afbeelding.findMany({   
                include: {
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
            const result = await prisma.Afbeelding.findUnique({
                where: {
                    id: parseInt(id),
                },
                include: {
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
                const tp = await prisma.Afbeelding.create({
                    data: {
                        url: result.url,
                        pandId: result.pandId
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
                const tp = await prisma.Afbeelding.update({
                    where: {
                        id: result.id,
                      },
                      data: {
                        url: result.url,
                        pandId: result.pandId,
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
            const result = await prisma.Afbeelding.delete({
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

module.exports = AfbeeldingController;