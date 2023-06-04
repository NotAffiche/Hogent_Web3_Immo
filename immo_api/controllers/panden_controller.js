const prisma = require("../db/prisma");

const { validationResult } = require("express-validator");

const PandController = {
    findAll: async (req, res) => {
        try {
            const result = await prisma.Pand.findMany({   
                include: {
                    typePand: true,
                    afbeeldingen: true,
                    pandRegios: {
                      include: {
                        regio: true
                      }
                    }
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
                    afbeeldingen: true,
                    pandRegios: {
                      include: {
                        regio: true
                      }
                    }
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
            const { typePandId, ...pandData } = result;
      
            const existingTypePand = await prisma.TypePand.findUnique({
              where: {
                id: typePandId,
              },
            });
      
            if (!existingTypePand) {
              return res.status(404).json({ error: 'TypePand not found' });
            }
      
            const createdPand = await prisma.Pand.create({
              data: {
                ...pandData,
                typePandId: typePandId,
              },
              include: {
                typePand: true,
                afbeeldingen: true,
              },
            });
      
            res.status(201).json(createdPand);
          } else {
            res.status(500).json(valResult.errors);
          }
        } catch (err) {
          console.error(err);
          res.status(500);
        }
      },
      update: async (req, res) => {
        try {
          const valResult = validationResult(req);
      
          if (!valResult.errors.length) {
            console.log(req.body);
            const { id, straat, huisNr, bus, postCode, gemeente, prijs, aantalKamers, oppervlakte, beschrijving, isVerkochtVerhuurd, typePandId } = req.body;
      
            const tp = await prisma.Pand.update({
              where: {
                id: id,
              },
              data: {
                straat,
                huisNr,
                bus,
                postCode,
                gemeente,
                prijs,
                aantalKamers,
                oppervlakte,
                beschrijving,
                isVerkochtVerhuurd,
                typePandId,
                updatedAt: new Date(),
              },
            });
      
            res.status(200).json(tp);
          } else {
            res.status(500).json(valResult.errors);
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'An error occurred while updating the pand.' });
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