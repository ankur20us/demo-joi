const Joi = require('joi');
 
/**
 * Created the schema with respect to all the rules and definitions of the metadata
 * 1. required fields are mapped with required
 * 2. min max and integer as well
 * .with('username', 'birthyear') -> this tells 
 * .with('username', 'password') -> this tells 
 */
const schema = Joi.object()
    .keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        access_token: [Joi.string(), Joi.number()],
        birthyear: Joi.number().integer().min(1900).max(2013),
        email: Joi.string().email({ minDomainAtoms: 2 })
    })
    .with('username', 'birthyear')          // if username exists birthyear needs to exist
    .with('username', 'password')           // if username exists password needs to exist
    .without('password', 'access_token')    // password and access_token are optional
    .unknown(true);                         // to allow other properties as well, allowedAdditional of json schema
 
// Return result.
const result = Joi.validate({ username: '123', birthyear:2012, password: "hello", asd:123}, schema);
/**
 * If in case the validation fails
 */
console.log('', result);
