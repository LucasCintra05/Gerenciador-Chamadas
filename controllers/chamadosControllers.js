const Chamados = require('../models/chamados')

exports.listarChamados = async(req, res)=>{
    const chamados = await Chamados.findAll()

    res.status(200).json(chamados)
}

exports.chamadosId = async(req, res)=>{
    const id = req.params.id

    const chamado = await Chamados.findByPk(id)

    res.status(200).json(chamado)
}

exports.chamadosFinalizados = async(req, res)=>{
    const chamados = await Chamados.findAll()
    const finalizados = []
    
    if(!chamados || chamados.length === 0){
        res.status(404).json({erro: "Chamados não encontrados"})
    }
    
    for(let i = 0; i < chamados.length; i++){
        if(chamados[i].status === "FINALIZADO"){
            finalizados.push(chamados[i])
        }
    }
    return res.status(200).json(finalizados)
    
}

exports.chamadoPrioridadeAlta = async(req, res)=>{
    const chamados = await Chamados.findAll()
    const prioAlta = []

    if(!chamados || chamados.length === 0){
        res.status(404).json({erro: "Chamados não encontrados"})
    }
    
    for(let i = 0; i < chamados.length; i++){
        if(chamados[i].prioridade === "ALTA"){
            prioAlta.push(chamados[i])
        }
    }
    res.status(200).json(prioAlta)
}

exports.inseirChamados = async(req, res)=>{
    const {titulo, descricao, prioridade} = req.body
    const prioridadeTratada = prioridade.toUpperCase()

    if(!titulo.trim() || !descricao.trim() || !prioridadeTratada.trim()){
        return res.status(400).json({erro: "Titulo, descrição e prioridade devem estar preenchidos."})
    }
    
    if(prioridadeTratada.trim() !== "BAIXA" && prioridadeTratada.trim() !== "MEDIA" && prioridadeTratada.trim() !== "ALTA"){
        return res.status(400).json({erro: "Prioridade devem estar preenchidos com [BAIXA, MEDIA, ALTA]."})

    }

    const novoChamado = await Chamados.create({titulo, descricao, prioridade: prioridadeTratada, status: "ABERTO"})

    res.status(201).json(novoChamado)
}

exports.atualizarChamados = async(req, res)=>{
    const chamado = await Chamados.findByPk(req.params.id)
    
    if(!chamado){
        return res.status(404).json({erro: "Chamado não encontrado"})
        
    }

    if(!titulo.trim() || !descricao.trim() || !prioridadeTratada.trim()){
        return res.status(400).json({erro: "Titulo, descrição e prioridade devem estar preenchidos."})
    }
    
    if(prioridadeTratada.trim() !== "BAIXA" && prioridadeTratada.trim() !== "MEDIA" && prioridadeTratada.trim() !== "ALTA"){
        return res.status(400).json({erro: "Prioridade devem estar preenchidos com [BAIXA, MEDIA, ALTA]."})

    }
    
    if(chamado.status === "FINALIZADO"){
        return res.status(400).json({erro: "O chamado não pode ser atualizado após finalizado."})
        
    }
    
    const {titulo, descricao, prioridade} = req.body

    const prioridadeTratada = prioridade.toUpperCase()
    
    await chamado.update({titulo, descricao, prioridadeTratada})
    
    res.status(200).json({ok: 'Atualização bem sucedida.'})
}

exports.deletarChamado = async(req, res)=>{
    const chamado = await Chamados.findByPk(req.params.id)
    
    if(!chamado){
        return res.status(404).json({erro: "Chamado não encontrado"})
        
    }
    
    await chamado.destroy()
    
    res.sendStatus(204)
}

exports.atualizarStatus = async(req, res)=>{
    const chamado = await Chamados.findByPk(req.params.id)
    
    if(!chamado){
        return res.status(404).json({erro: "Chamado não encontrado"})
        
    }
    
    if(chamado.status === "ABERTO"){
        await chamado.update({status:"EM_ATENDIMENTO"})
        return res.status(200).json({ok: `Atualização de status para ${chamado.status} bem sucedida!`})

    }
    if(chamado.status === "EM_ATENDIMENTO"){
        await chamado.update({status:"FINALIZADO"})
        return res.status(200).json({ok: `Atualização de status para ${chamado.status} bem sucedida!`})

    }
    if(chamado.status === "FINALIZADO"){
        return res.status(404).json({erro: 'Chamado já finalizado, impossível alterar o status.'})

    }
}