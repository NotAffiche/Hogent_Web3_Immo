const prisma = require("../db/prisma");

const { validationResult } = require("express-validator");

const PandController = {
    findAll: async (req, res) => {
        try {
            const result = await prisma.Pand.findMany({   
                include: {
                    typePand: true,
                    afbeeldingen: true
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
            const result = await prisma.Pand.findUnique({
                where: {
                    id: parseInt(id),
                },
                include: {
                    typePand: true,
                    afbeeldingen: true
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
                const tp = await prisma.Pand.create({
                    data: {
                        straat: result.straat,
                        huisNr: result.huisNr,
                        bus: result.bus,
                        postCode: result.postCode,
                        gemeente: result.gemeente,
                        aantalKamers: result.aantalKamers,
                        oppervlakte: result.oppervlakte,
                        beschrijving: result.beschrijving,
                        isVerkochtVerhuurd: result.isVerkochtVerhuurd,
                        typePandId: result.typePandId
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
                const tp = await prisma.Pand.update({
                    where: {
                        id: result.id,
                      },
                      data: {
                        straat: result.straat,
                        huisNr: result.huisNr,
                        bus: result.bus,
                        postCode: result.postCode,
                        gemeente: result.gemeente,
                        aantalKamers: result.aantalKamers,
                        oppervlakte: result.oppervlakte,
                        beschrijving: result.beschrijving,
                        isVerkochtVerhuurd: result.isVerkochtVerhuurd,
                        typePandId: result.typePandId,
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
            const result = await prisma.Pand.delete({
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

module.exports = PandController;