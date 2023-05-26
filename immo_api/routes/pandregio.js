const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const pandregioController = require("../controllers/pandregio_controller");

//
router.get('/', pandregioController.findAll);
router.get('/:id([0-9]+)', pandregioController.findById);

router.post(
    '/', 
    [
        body("pandId").exists().withMessage("pandid moet bestaan"),
        body("regioId").exists().withMessage("regioId moet bestaan"),
    ], 
    pandregioController.create);
router.put(
    '/', 
    [
        body("pandId").exists().withMessage("pandid moet bestaan"),
        body("regioId").exists().withMessage("regioId moet bestaan"),
    ], 
    pandregioController.update);
router.delete('/:id([0-9]+)', pandregioController.deleteById);
//

module.exports = router;