const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const regioController = require("../controllers/regio_controller");

//
router.get('/', regioController.findAll);
router.get('/:id([0-9]+)', regioController.findById);

router.post(
    '/', 
    [
        body("naam").exists().withMessage("Naam moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
    ], 
    regioController.create);
router.put(
    '/', 
    [
        body("naam").exists().withMessage("Naam moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
    ], 
    regioController.update);
router.delete('/:id([0-9]+)', regioController.deleteById);
//

module.exports = router;