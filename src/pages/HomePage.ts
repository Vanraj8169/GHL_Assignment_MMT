import { expect, Page } from "@playwright/test";
import { Locators } from "../locators/locators";

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async landToHomePage(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickToFlights(): Promise<void> {
    await this.page.locator(Locators.Flight).click();
  }

  async enterToAndFromCityDetails(to: string, from: string): Promise<void> {
    // Fill the From City details
    await this.page.locator(Locators.FromCityInput).click();
    await this.page.fill(Locators.FromCityTextField, to);
    await this.page.keyboard.press("Enter");
    await this.page.locator(Locators.FromCitySelection).click();

    // Fill the To City details
    await this.page.locator(Locators.ToCityInput).click();
    await this.page.fill(Locators.ToCityTextField, from);
    await this.page.keyboard.press("Enter");
    await this.page.locator(Locators.ToCitySelection).click();

    const prices: number[] = [];
    let lowestPrice = Number.MAX_VALUE;
    let lowestPriceDay = "";

    for (let day = 8; day <= 31; day++) {
      const formattedDay = day.toString().padStart(2, "0");

      // Wait for element and extract price
      await this.page.waitForSelector(`//*[@id='${formattedDay}/12/2024']`, {
        state: "visible",
      });
      const priceText = await this.page
        .locator(`//*[@id='${formattedDay}/12/2024']`)
        .textContent();

      if (priceText) {
        const numericPrice = parseInt(priceText.replace(/[^0-9]/g, ""), 10);
        prices.push(numericPrice);

        // Track the lowest price and corresponding day
        if (numericPrice < lowestPrice) {
          lowestPrice = numericPrice;
          lowestPriceDay = formattedDay;
        }
      }
    }
    console.log(prices);
    // Click on the date with the lowest price
    if (lowestPriceDay) {
      await this.page.waitForTimeout(9000);
      await this.page.locator(`//*[@id='${lowestPriceDay}/12/2024']`).click();
      
    }

    await this.page.locator(Locators.SearchBtn).click();
    await this.page.waitForLoadState();

    await this.page.locator(Locators.FlightSearch.BookNowBtn).click();
    await this.page.waitForLoadState();

    // applying invalid promo code
    let invalidPROMO: string = "ABCDEFG";
    let expectedInvalidPromoMsg: string = "Invalid Coupon";
    await this.page.locator(Locators.PromoCode.ClearBtn).click();
    await this.page.fill(Locators.PromoCode.PromoCodeTextField, invalidPROMO);
    await this.page.locator(Locators.PromoCode.ApplyBtn).click();
    await this.page.waitForSelector(Locators.PromoCode.PromoMsg, {
      state: "visible",
    });
    const invalidPromoMsg = await this.page
      .locator(Locators.PromoCode.PromoMsg)
      .textContent();

    expect(invalidPromoMsg?.trim()).toBe(expectedInvalidPromoMsg);
    await this.page.waitForTimeout(2000);
    // apply valid promo code
    let validPROMO: string = "EMTNCF";
    await this.page.fill(Locators.PromoCode.PromoCodeTextField,validPROMO);
    await this.page.waitForTimeout(2000);
    await this.page.locator(Locators.PromoCode.ApplyBtn).click();
    await this.page.waitForSelector(Locators.PromoCode.ValidPromoMsg,{
      state: "visible",
    })
    await this.page.locator(Locators.PromoCode.ValidPromoMsg).textContent();

  
    await this.page.waitForSelector(Locators.TicketPrice);
    const finalPrice = await this.page.locator(Locators.TicketPrice).textContent();
    expect(finalPrice?.trim()).toBe(lowestPrice);

    await this.page.locator(Locators.ContinueBooking).click();
   
  }
}
