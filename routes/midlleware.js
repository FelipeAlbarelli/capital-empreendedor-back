const db = require('../database/functions');

// definie middlewares para uso das routes da api

// Se usuário da url for encontrado, o injeta em req, se não manda uma msg de erro
const findUser = async (req , res , next) => {
    try {
        const user = await db.getOne('users' , req.params['userEmail']);
        if (user == undefined){
            throw "user not found"
        }
        req.user = user;
        next()
    } catch (e) {
        res.status(404).send({
            'error' : e
        })
    }
}

// Se usuário for encontrado injeta sua lista de oportunidades, se não manda msg de erro
const findOppList = async (req , res , next) => {
    try {
        const data = await db.getOne('opportunities' , req.params['userEmail']);
        if (data === undefined){
            throw "user not found"
        }
        req.oppList = data["opportunities"];
        next()
    } catch (e){
        res.status(404).send({'error' : e})
    }
}

// Como não há um id único para cada opp, foi usado o índice dessa na array.
// Injeta um req.opp se indice estiver na lista.
// Obs : req.opp é um elemento de req.oppList, portanto alterar o primeiro altera o segundo
const findSingleOpp = (req , res , next) => {
    const id = parseInt(req.params["id"]);
    if (!isNaN(id)  && id < req.oppList.length){
        req.opp = req.oppList[id];
        next()
    } else {
        res.status(404).send({
            error : 'opportunitie not found'
        })
    }
}

module.exports = {findUser , findOppList , findSingleOpp}