import bcrypt from 'bcrypt'

export const hash = async (pass) => {
    return await bcrypt.hash(pass, 5);
}

export const comparePass = (pass, hashed) => {
    return bcrypt.compare(pass, hashed);
}