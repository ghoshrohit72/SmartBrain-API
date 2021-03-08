const handleProfileGet = ( req, res, DB )=>{
    const { id } = req.params;
    
    DB.select('*').from('users')
        .where({id})
        .then(user =>{
            if(user.length)
            {
                res.json(user[0]);
            }
            else{
                res.status(400).json('Not Found')
            }
        })
        .catch(err => res.status(400).json('Unable to register'))
        
}

module.exports = {
    handleProfileGet: handleProfileGet
}