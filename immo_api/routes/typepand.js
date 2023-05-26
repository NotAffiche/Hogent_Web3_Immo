const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const typepandController = require("../controllers/typepand_controller");

//
router.get('/', typepandController.findAll);
router.get('/:id([0-9]+)', typepandController.findById);

router.post(
    '/', 
    [
        body("naam").exists().withMessage("Naam moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
    ], 
    typepandController.create);
router.put(
    '/', 
    [
        body("naam").exists().withMessage("Naam moet bestaan").isLength({min:3}).withMessage("Minstens 3 karakters"),
    ], 
    typepandController.update);
router.delete('/:id([0-9]+)', typepandController.deleteById);
//

module.exports = router;