import { prisma } from "../../../database/prisma"
import supertest from "supertest";
import { app } from "../../../app";
import { CarPayload } from "../../interfaces";

describe("Car list by Id integration tests", () => {
    const request = supertest(app);
    const endpoint = "/api/cars/"

    let carId: number;
    let carData: CarPayload;

    beforeEach(async () => {

        carData = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 50000
        }
        const createdCar = await prisma.car.create({ data: carData });

        carId = createdCar.id;


    });
    test("Should be able to list a car by id", async () => {

        const expectedResponseBody = {
            id: expect.any(Number),
            name: carData.name,
            description: carData.description,
            brand: carData.brand,
            year: carData.year,
            km: carData.km
        };
        const getById = await request.get(endpoint + carId);

        expect(getById.body).toEqual(expectedResponseBody);
        expect(getById.status).toBe(200);


    });
    test("Should throw an error if try to catch an invalid Id", async () => {
        const validPayload = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 130000
        };
        await request.post(endpoint).send(validPayload);
        const getByWrongId = await request.get(endpoint + 1);

        expect(getByWrongId.body).toEqual({ "message": "Car not found." });
        expect(getByWrongId.status).toBe(404);

    })
})
