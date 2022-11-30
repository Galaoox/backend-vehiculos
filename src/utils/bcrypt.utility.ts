import * as bcrypt from 'bcryptjs';

export const encrypt = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
export const comparePassword = async function (
    password: string,
    passwordBd: string,
) {
    return password && passwordBd
        ? await bcrypt.compare(password, passwordBd)
        : false;
};
