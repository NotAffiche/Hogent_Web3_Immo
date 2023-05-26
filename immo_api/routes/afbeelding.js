const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const afbeeldingController = require("../controllers/afbeelding_controller");

//
router.get('/', afbeeldingController.findAll);
router.get('/:id([0-9]+)', afbeeldingController.findById);

router.post(
    '/', 
    [
        body("url").exists().withMessage("url moet bestaan"),
        body("pandId").exists().withMessage("pandid moet bestaan"),
    ], 
    afbeeldingController.create);
router.put(
    '/', 
    [
        body("url").exists().withMessage("url moet bestaan"),
        body("pandId").exists().withMessage("pandid moet bestaan"),
    ], 
    afbeeldingController.update);
router.delete('/:id([0-9]+)', afbeeldingController.deleteById);
//

module.exports = router;