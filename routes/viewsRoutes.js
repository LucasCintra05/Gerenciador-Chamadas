const express = require('express')
const router = express.Router()
const Chamado = require('../models/chamados')

router.get('/', async(req, res)=>{
    
    try {
        const chamados = await Chamado.findAll()
        res.render('lista', { chamados})
        
    } catch (error) {
        res.status(500).json({erro: 'Erro ao carregar os chamados.'})
    }

})
