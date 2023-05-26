const prisma = require("../db/prisma");

const { validationResult } = require("express-validator");

const GebruikerController = {
    findAll: async (req, res) => {
        try {
            const result = await prisma.Gebruiker.findMany({   
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
            const result = await prisma.Gebruiker.findUnique({
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
                const tp = await prisma.Gebruiker.create({
                    data: {
                        voorNaam: result.voorNaam,
                        achterNaam: result.achterNaam,
                        email: result.email,
                        wachtwoord: result.wachtwoord,
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
                const tp = await prisma.Gebruiker.update({
                    where: {
                        id: result.id,
                      },
                      data: {
                        voorNaam: result.voorNaam,
                        achterNaam: result.achterNaam,
                        email: result.email,
                        wachtwoord: result.wachtwoord,
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

module.exports = GebruikerController;