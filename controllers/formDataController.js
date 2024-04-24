import express from 'express';
import { validateFormData, saveFormData } from '../services/formDataService.js';
import { ValidationError,DatabaseError } from '../errors/customErrors.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
    try {
        const { error } = validateFormData(req.body);
        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        await saveFormData(req.body);

        res.status(201).send('Form data saved successfully');
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).send(error.message);
        } else if (error instanceof DatabaseError) {
            console.error(error);
            res.status(500).send('Error saving form data');
        }
        else{
            console.log(error)
            res.send(500).send("Internal Server Error")
        }
    }
});

export default router;
