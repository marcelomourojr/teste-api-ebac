const Joi = require ('joi')

const usuariosSchema = Joi.object({
    quantidade: Joi.number(), 
    usuarios: Joi.array().items({
        email: Joi.string(),
        senha: Joi.string(),
        _id: Joi.string()
    })
})
export default usuariosSchema;