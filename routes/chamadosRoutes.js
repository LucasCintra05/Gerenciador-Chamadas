const express = require('express')
const router = express.Router()
const controller = require('../controllers/chamadosControllers')

router.get('/', controller.listarChamados)
router.get('/:id', controller.chamadosId)
router.get('/status/FINALIZADO', controller.chamadosFinalizados)
router.get('/prioridade/ALTA', controller.chamadoPrioridadeAlta)
router.post('/', controller.inseirChamados)
router.put('/:id', controller.atualizarChamados)
router.delete('/:id', controller.deletarChamado)
router.patch('/:id/status', controller.atualizarStatus)

module.exports = router