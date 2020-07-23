const db = require('./functions')

// funções que auxiliam na comunicação com o 'banco de dados' ou abstraem a estrutura do banco


// atualiza oldOpp com as chaves de update, mas não adiciona chaves que já não estejam em oldOpp
// garante que banco de dados não tenha objs fora da estrutura padrão
const updateOpp = (oldOpp , updates) => {
    for (k in oldOpp){
        // truque com || causa erros ao substituir valores booleanos
        oldOpp[k] = updates[k] === undefined ? oldOpp[k] : updates[k];
    }
}

// cria obj Opp. Tbm garante que banco não tenha objs fora do padrão
const createOpp = ({ name = "unknow" , limit = 0 , interest = 1 , term = 0 , isActive = Fale }) => {
    return {
        name , limit , interest , term , isActive
    }
}

// salva no banco a Opp
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