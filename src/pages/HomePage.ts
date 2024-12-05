import { Page } from "@playwright/test";
import { Locators } from "../locators/locators";

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async landToHomePage(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.locator(Locators.CancelBtn).click();
  }

  async clickToFlights(): Promise<void> {
    await this.page.locator(Locators.Flight).click();
  }

  async enterToAndFromCityDetails(to: string, from: string): Promise<void> {
    await this.page.locator(Locators.FromCityInput).click();
    await this.page.fill(Locators.FromCityTextField, to);
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Enter");
    await this.page.locator(Locators.CitySelection).click();

    await this.page.locator(Locators.ToCityInput).click();
    await this.page.fill(Locators.ToCityTextField, from);
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Enter");
    await this.page.locator(Locators.CitySelection).click();
  }

//   async selectingDateWithLowestFare(): Promise<void> {
//     const datenPriceArray:any = [];
//     const datenPriceDivs=await this.page.locator("//div[@class='DayPicker-Day DayPicker-Day--today']//div[1]").all();
//         for(let i=0;i<datenPriceDivs.length;i++){
//             const datenPriceParas=await datenPriceDivs[i].locator("/p").all();
//             let date=Number(await datenPriceParas[0].textContent());
//             let ticket_price=Number(await datenPriceParas[1].textContent());
//             datenPriceArray.push({date, ticket_price, element: datenPriceDivs[i]});
//         }

//         for(let i=0;i<datenPriceArray.length;i++){
//             console.log(datenPriceArray[i]);
//         }
//   }

async selectingDateWithLowestFare():Promise<void> {
    await this.page.locator("//label[@for='departure']").click();
    await this.page.waitForTimeout(4000);
    await this.page.locator("//div[@aria-selected='true']//div[1]").click();
    await this.page.waitForTimeout(4000);
    await this.page.locator(Locators.SearchBtn).click();
    await this.page.waitForTimeout(4000);
}



}
