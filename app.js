const express = require('express')
const sequelize = require('./config/database')
const Chamado = require('./models/chamados')
const viewsRoutes = require('./routes/viewsRoutes')
const chamadosRoutes = require('./routes/chamadosRoutes')
const app = express()
const port = 3000

app.use(express.json())

app.set('view engine', 'ejs')

app.use('/', viewsRoutes)

app.use('/chamados', chamadosRoutes)

sequelize.sync().then(()=>{
    console.log("Banco de dados OK!")
    app.listen(port, ()=>{
        console.log("Success. Servidor na porta http://localhost:3000")
    })
})