const db = require('./functions')

const updateOpp = (oldOpp , updates) => {
    for (k in oldOpp){
        oldOpp[k] = updates[k] || oldOpp[k];
    }
}

const createOpp = ({ name = "unknow" , limit = 0 , interest = 1 , term = 0 , isActive = Fale }) => {
    return {
        name , limit , interest , term , isActive
    }
}

const saveOppList = async (email , oppList) => {
    try {
        await db.set('opportunities' , email , {
            'opportunities' : oppList
        })
    } catch (e) {
        throw "unable to acces server."
    }
};

module.exports = { updateOpp , createOpp , saveOppList}