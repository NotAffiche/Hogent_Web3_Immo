const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const pandenController = require("../controllers/panden_controller");

//
router.get('/', pandenController.findAll);
router.get('/:id([0-9]+)', pandenController.findById);

router.post(
    '/', 
    [
        body("straat").exists().withMessage("straat moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
        body("huisNr").exists().withMessage("huisnr moet bestaan"),
        body("postCode").exists().withMessage("postcode moet bestaan").isLength({min:4, max:4}).withMessage("4 karakters"),
        body("gemeente").exists().withMessage("gem moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
        body("aantalKamers").exists().withMessage("#kamers moet bestaan"),
        body("oppervlakte").exists().withMessage("opp moet bestaan"),
        body("beschrijving").exists().withMessage("besch moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
        body("isVerkochtVerhuurd").exists().withMessage("status moet bestaan"),
        body("typePandId").exists().withMessage("typepandid moet bestaan"),
    ], 
    pandenController.create);
router.put(
    '/', 
    [
        body("straat").exists().withMessage("straat moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
        body("huisNr").exists().withMessage("huisnr moet bestaan"),
        body("postCode").exists().withMessage("postcode moet bestaan").isLength({min:4, max:4}).withMessage("4 karakters"),
        body("gemeente").exists().withMessage("gem moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
        body("aantalKamers").exists().withMessage("#kamers moet bestaan"),
        body("oppervlakte").exists().withMessage("opp moet bestaan"),
        body("beschrijving").exists().withMessage("besch moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
        body("isVerkochtVerhuurd").exists().withMessage("status moet bestaan"),
        body("typePandId").exists().withMessage("typepandid moet bestaan"),
    ], 
    pandenController.update);
router.delete('/:id([0-9]+)', pandenController.deleteById);
//

module.exports = router;