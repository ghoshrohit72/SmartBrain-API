
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '7174c2e5bd564a8b816fe45ac610683d'
  });


const handleApiCall = (req, res)  => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to fetch Data'))

}
  

const handleImagePut = (req, res, DB )=>{
    const { id } = req.body;

    DB('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entires') )
}

module.exports= {
    handleImagePut:handleImagePut,
    handleApiCall:handleApiCall
}