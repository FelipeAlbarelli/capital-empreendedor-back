const db = require('../database/functions');

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