import test, { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Validating Ease my trip website", async () => {
  let page: Page;
  let homePage: HomePage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    await context.grantPermissions(["geolocation"], {
      origin: `${process.env.HOMEPAGE_URL}`,
    });
    const page = await context.newPage();
    homePage = new HomePage(page);

    await homePage.landToHomePage(process.env.HOMEPAGE_URL!);
  });

  test("clicking flight", async () => {
    await homePage.clickToFlights();
  });

  test("Enter To and From City Details and Selecting Date", async () => {
    await homePage.enterToAndFromCityDetails("Pune", "Bangalore");
  });
});
