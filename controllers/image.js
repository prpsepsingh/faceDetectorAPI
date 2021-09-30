const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'API KEY HERE'
});

const handleApiCall = (request, response) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
        .then(data => {
            response.json(data);
        })
        .catch(error => response.status(400).json('unable to work with API'));
}

const handleImage = (db) => (request, response) => {
    const {id} = request.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            response.json(entries[0]);
        })
        .catch(error => response.status(400).json('unable to get entries'));
}

module.exports = {
    // handleImage: handleImage // no need to do this since ES6.
    handleImage,
    handleApiCall
};
