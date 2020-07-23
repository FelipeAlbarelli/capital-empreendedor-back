const express = require('express');
const db = require('../database/functions');
const {findUser , findOppList, findSingleOpp} = require('./midlleware');
const {updateOpp , createOpp , saveOppList} = require('../database/models');

const router = express.Router();

router.get('/test' , async (req, res) => {
    try {
        res.send(await db.getAll('opportunities'))
    } catch (e){

    }
})

// read all users
router.get('/users' , async (req , res) => {
    try {
        const data = await db.getAll("users")
        res.send(data)
    } catch (e) {
        res.status(500).send({
            'error' : e
        })
    }
})

// read user
router.get('/user/:userEmail/info' , findUser , (req , res) => {
    res.send(req.user)
})

// read all opportunities
router.get('/user/:userEmail/opportunities', findOppList ,(req , res) => {
    res.send(req.oppList)
})

// read single opportunitie
router.get('/user/:userEmail/opportunities/:id', findOppList , findSingleOpp ,(req , res) => {
    res.send(req.opp)
})

// update opportunitie
router.patch('/user/:userEmail/opportunities/:id', findOppList , findSingleOpp , async (req , res) => {
    try {
        updateOpp(req.opp , req.body);
        await saveOppList(req.params['userEmail'] , req.oppList);
        res.send(req.opp);
    } catch (e){
        res.status(404).send({'error' : e})
    }
})

// create opportunitie
router.post('/user/:userEmail/opportunities', findOppList , async (req , res) => {
    try {
        const opp = createOpp(req.body);
        req.oppList.push(opp);
        await saveOppList(req.params['userEmail'] , req.oppList);
        res.send(opp)
    } catch (e) {
        res.status(404).send({'error' : e})

    }
})

// delete opportunitie
router.delete('/user/:userEmail/opportunities/:id' , findOppList , findSingleOpp , async (req , res) => {
    try {
        const id = parseInt(req.params['id']);
        req.oppList.splice(id , 1);
        await saveOppList(req.params['userEmail'] , req.oppList);
        res.send(req.opp)
    } catch (e) {
        res.status(404).send({'error' : e})

    }
})


module.exports = router