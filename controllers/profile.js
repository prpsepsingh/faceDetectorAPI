const handleProfile = (db) => (request, response) => {
    const {id} = request.params;
    db.select('*').from('users').where({id: id})
        .then(user => {
            if (user.length) {
                response.json(user[0]);
            } else {
                response.status(400).json('Not found');
            }
        })
        .catch(err => response.status(400).json('error getting user'));
}

module.exports = {
    // handleProfile: handleProfile // no need to do this since ES6.
    handleProfile
};
