import test, { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";


test.describe("Validating Make my trip website", async () => {
    let page: Page;
    let homePage:HomePage;
    test.beforeAll(async ({browser}) =>{
        page = await browser.newPage();
        homePage = new HomePage(page);
        await homePage.landToHomePage(process.env.HOMEPAGE_URL!);
    })

    test("clicking flight", async () => {
        await homePage.clickToFlights();
    })

    test("Enter To and From City Details", async () => {
        await homePage.enterToAndFromCityDetails("Pune","Bangalore");
    })

    test('Selecting Date with Lowest Fare', async () => {
        await homePage.selectingDateWithLowestFare();
    })
})