export const userToRegister = {
    firstname: "john",
    lastname: "doe",
    email: "john@doe.com",
    password: "test123"
};

export const userWithMissingFirstname: object = {
    ...userToRegister,
    firstname: undefined
};

export const userWithMissingLastname: object = {
    ...userToRegister,
    lastname: undefined
};

export const userWithMissingEmail: object = {
    ...userToRegister,
    email: undefined
};

export const userWithMissingPassword: object = {
    ...userToRegister,
    password: undefined
};

export const userWithWrongShortFirstname: object = {
    ...userToRegister,
    firstname: "te"
};

export const userWithWrongLongFirstname: object = {
    ...userToRegister,
    firstname: 'azertyuiopqsdfghjklmw'
};

export const userWithWrongShortLastname: object = {
    ...userToRegister,
    lastname: 'te'
};

export const userWithWrongLongLastname: object = {
    ...userToRegister,
    lastname: 'azertyuiopqsdfghjklmw'
};

export const userWithWrongPasswordOne: object = {
    ...userToRegister,
    password: 'azer'
};

export const userWithWrongPasswordTwo: object = {
    ...userToRegister,
    password: 123
};

export const userWithWrongPasswordTree: object = {
    ...userToRegister,
    password: 'azertty'
};

export const userWithWrongEmailOne: object = {
    ...userToRegister,
    email: 'azeezadsf'
};

export const userWithWrongEmailTwo: object = {
    ...userToRegister,
    email: 'azeaze.com'
};

export const userWithWrongEmailTree: object = {
    ...userToRegister,
    email: 'zaeeaz@gmail.azettdsgf'
};
