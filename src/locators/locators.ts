export const Locators = {
    Flight: "//a[normalize-space(text())='Flights']",
    CancelBtn: "//span[@class='commonModal__close']",
    FromCityInput: "(//input[@class='autoFlll cityinput'])[1]",
    ToCityInput: "(//input[@class='srctinput autoFlll'])[2]",
    FromCityTextField: "(//input[@class='srctinput autoFlll'])[1]",
    ToCityTextField: "(//input[@class='srctinput autoFlll'])[2]",
    FromCitySelection: "(//div[@class='mflexcol'])[1]",
    ToCitySelection: '//*[@id="toautoFill"]/ul/li[1]',
    prices: "//span[@class='active-date']",
    SearchBtn: '//*[@id="divSearchFlight"]/button',
    FlightSearch: {
        BookNowBtn: "(//button[contains(@class,'btn book-bt-n')])[1]"
    },
    PromoCode: {
        ClearBtn: "(//div[@class='cpn-r']//div)[2]",
        PromoCodeTextField: "//input[@ng-model='CouponCode']",
        ApplyBtn: "//div[normalize-space(text())='apply']",
        PromoMsg: "//p[normalize-space(text())='Invalid Coupon']",
        ValidPromoMsg: "(//div[contains(@class,'bor mtp10')]//p)[2]"
    },
    ContinueBooking: "//div[@id='divContinueReview2']//span[1]",
    TicketPrice: "(//div[@class='frettlsum']//span)[1]"
}
