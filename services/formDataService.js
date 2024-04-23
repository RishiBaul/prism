import Joi from 'joi';
import FormData from '../models/formDataModel.js';
import { ValidationError,DatabaseError } from '../errors/customErrors.js';

export const validateFormData = (data)=> {
    const schema = Joi.object({
        address1: Joi.string().required(),
        address2: Joi.string().required(),
        anyOtherText: Joi.string().when('business', {
            is: 'Others',
            then: Joi.string().required(),
            otherwise: Joi.string().allow('').optional()
        }),
        business: Joi.string().valid('Restaurant', 'Supermarket', 'Others').required(),
        city: Joi.string().required(),
        companyName: Joi.string().required(),
        contactPerson: Joi.string().required(),
        cookedFood: Joi.boolean().required(),
        country: Joi.string().required(),
        dimSum: Joi.boolean().required(),
        email: Joi.string().email().required(),
        general: Joi.boolean().required(),
        grocery: Joi.boolean().required(),
        landmark: Joi.string().required(),
        meat: Joi.boolean().required(),
        phone: Joi.string().pattern(/^\d{10}$/).required(),
        preferredTime: Joi.array().items(Joi.string()).min(2).required(),
        products: Joi.array().items(Joi.object({
            preferredProducts: Joi.string().required(),
            orderFrequency: Joi.string().required(),
            quantity: Joi.string().required()
        })).required(),
        roastedMeat: Joi.boolean().required(),
        seafood: Joi.boolean().required(),
        state: Joi.string().required(), // havent included all the states available but we can add all the name of the states to make it more validating
        tofu: Joi.boolean().required(),
        zipCode: Joi.string().required()
    });

    const { error } = schema.validate(data);

    if (error) return { error };

    const { cookedFood, dimSum, general, grocery, meat, roastedMeat, seafood, tofu } = data;
    const booleanFields = [cookedFood, dimSum, general, grocery, meat, roastedMeat, seafood, tofu];
    const trueCount = booleanFields.filter(field => field === true).length;
    const atLeastOneTrue = trueCount > 0;

    if (!atLeastOneTrue) {
        return { error: new ValidationError('At least one of the boolean fields (excluding preferredTime) must be true.') };
    }

    return { value: data };
}

export const saveFormData = async (data) => {
    try {
        const formData = new FormData(data);
        await formData.save();
        return { message: 'Form data saved successfully' };
    } catch (error) {
        throw new DatabaseError('Error saving form data');
    }
};
