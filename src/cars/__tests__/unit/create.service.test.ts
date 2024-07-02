import { prisma } from "../../../database/prisma";
import { create } from "../../services"
import { validTestCar1 } from "../mocks/mocks";

describe("Car service create unit tests", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
    });
    test("Should be create a Car", async () => {

        const receivedValue = await create(validTestCar1);

        const expectedValue = {
            id: expect.any(Number),
            name: validTestCar1.name,
            description: validTestCar1.description,
            brand: validTestCar1.brand,
            year: validTestCar1.year,
            km: validTestCar1.km
        };
        expect(receivedValue).toEqual(expectedValue);

        const createdCarId = await prisma.car.findUnique({
            where: { id: receivedValue.id }
        });
        expect(createdCarId).toBeTruthy();
    });

})