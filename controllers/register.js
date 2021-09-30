const handleRegister = (request, response, db, bcrypt) => {
    const {email, name, password} = request.body;
    const hash = bcrypt.hashSync(password);

    if (!email || !name || !password) {
        return response.status(400).json('incorrect form submission');
    }

        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return (trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        response.json(user[0]);
                    })
                );
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => response.status(400).json('unable to register'))
}

module.exports = {
    // handleRegister: handleRegister // no need to do this since ES6.
    handleRegister
};
