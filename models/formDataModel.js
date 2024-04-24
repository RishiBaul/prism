import mongoose from 'mongoose';
const formDataSchema = new mongoose.Schema({
    address1: { type: String, required: true },
    address2: { type: String, required: true },
    anyOtherText: {
        type: String,
        required: function () {
            return this.business === 'Others';
        }
    },
    business: { type: String, required: true },
    city: { type: String, required: true },
    companyName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    cookedFood: { type: Boolean, required: true },
    country: { type: String, required: true },
    dimSum: { type: Boolean, required: true },
    general: { type: Boolean, required: true },
    grocery: { type: Boolean, required: true },
    landmark: { type: String, required: true },
    meat: { type: Boolean, required: true },
    phone: { type: String, required: true },
    preferredTime: {
        type: [String],
        validate: {
            validator: function (v) {
                return v && v.length >= 2;
            },
            message: 'PreferredTime must contain at least two values.'
        },
        required: true
    },
    products: {
        type: [{
            preferredProducts: { type: String, required: true },
            orderFrequency: { type: String, required: true },
            quantity: { type: String, required: true }
        }],
        required: true
    },
    roastedMeat: { type: Boolean, required: true },
    seafood: { type: Boolean, required: true },
    state: { type: String, required: false },
    tofu: { type: Boolean, required: true },
    zipCode: { type: String, required: true }
});

const FormData= mongoose.model('FormData', formDataSchema);


export default FormData;
