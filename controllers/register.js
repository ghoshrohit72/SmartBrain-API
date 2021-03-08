const handleRegister = (req, res, DB, bcrypt) =>
{
    if(!email || !name || !password)
    {
        return res.status(400).json('Incorrect Form Submission')
    }
const { name, email, password } = req.body;
const hash = bcrypt.hashSync(password)
DB.transaction(trx => {
    trx.insert({
        hash: hash,
        email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
            return DB('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
    })
    .then(trx.commit)
    .catch(trx.rollback)
})
        
.catch(err=> res.status(400).json('unable to join'))

}
 
module.exports = {
    handleRegister : handleRegister
};