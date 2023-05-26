const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const gebruikerController = require("../controllers/gebruiker_controller");

//
router.get('/', gebruikerController.findAll);
router.get('/:id([0-9]+)', gebruikerController.findById);

router.post(
    '/', 
    [
        body("voorNaam").exists().withMessage("vNaam moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
        body("achterNaam").exists().withMessage("aNaam moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
        body("email").exists().withMessage("email moet bestaan").isEmail().withMessage("moet email zijn"),
        body("wachtwoord").exists().withMessage("Naam moet bestaan").isLength({min:8}).withMessage("Minstens 8 karakters").isStrongPassword().withMessage("moet sterk ww zijn"),
    ], 
    gebruikerController.create);
router.put(
    '/', 
    [
        body("voorNaam").exists().withMessage("vNaam moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
        body("achterNaam").exists().withMessage("aNaam moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
        body("email").exists().withMessage("email moet bestaan").isEmail().withMessage("moet email zijn"),
        body("wachtwoord").exists().withMessage("Naam moet bestaan").isLength({min:8}).withMessage("Minstens 8 karakters").isStrongPassword().withMessage("moet sterk ww zijn"),
    ], 
    gebruikerController.update);
router.delete('/:id([0-9]+)', gebruikerController.deleteById);
//

module.exports = router;