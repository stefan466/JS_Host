const Joi = require('joi');

const idSchema = Joi.object({
    id: Joi.number().integer().min(1).required()
});

const actorSchema = Joi.object({
    first_name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    last_name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    gender: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required()

});

const directorSchema = Joi.object({
    first_name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    last_name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required()
});

const genreSchema = Joi.object({
    genre_title: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
   
});

const movieSchema = Joi.object({
    mov_title: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    mov_lang: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    mov_year: Joi.number().integer(),
    mov_time: Joi.number().integer(),
    mov_rel_country: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    
});

const roleSchema = Joi.object({
    role: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
   
});

const ratingSchema = Joi.object({
    rev_stars: Joi.number().integer(),
    num_of_ratings: Joi.number().integer()
    
});

const reviewerSchema = Joi.object({
    first_name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    last_name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    username: Joi.string().trim().alphanum().min(6).max(20).required(),
    password: Joi.string().trim().alphanum().min(6).max(20).required(),
    admin: Joi.boolean(),
    
});

const loginSchema = Joi.object({
    username: Joi.string().trim().alphanum().min(6).max(20).required(),
    password: Joi.string().trim().alphanum().min(6).max(20).required()
});

module.exports = {
    idSchema,
    actorSchema,
    directorSchema,
    genreSchema,
    movieSchema,
    roleSchema,
    ratingSchema,
    reviewerSchema,
    loginSchema
    
};