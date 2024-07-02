const validTestCar1 = {
    name: "corsa",
    description: "corsinha teste",
    brand: "Chevrolet",
    year: 2002,
    km: 50000
}; const validTestCar2 = {
    name: "astra",
    description: "astrinha teste",
    brand: "Chevrolet",
    year: 2012,
    km: 70000
}; const validTestCar3 = {
    name: "clio",
    description: "cliozin teste",
    brand: "Renault",
    year: 2000,
    km: 150000
};
//mockar o client do prisma, para não usar o banco nos testes unitários.

export { validTestCar1, validTestCar2, validTestCar3 };