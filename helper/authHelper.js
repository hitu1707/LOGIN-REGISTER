import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(15, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);  
            });
        });
    });
};

export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};
