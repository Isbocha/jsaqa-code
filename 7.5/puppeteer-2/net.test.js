const { clickElement, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});


describe("qamid.tmweb.ru test ", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("Test for choosing the second film of the third day", async () => {
    await clickElement(page, "body > nav > a:nth-child(3) > span.page-nav__day-week");
    await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
    const actual = await getText(page, ".buying__info-start");
    await expect(actual).toContain("Начало сеанса: 14:00");
  });


  test("The reservation selector must be visible", async () => {
    await clickElement(page, "body > nav > a:nth-child(7)");
    await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
    const actual = await getText(page, ".acceptin-button");
    await expect(actual).toContain("Забронировать");
  });

  test("T", async () => {
    await clickElement(page, "body > nav > a:nth-child(7)");
    await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
    await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(7)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    await expect(actual).toContain("Вы выбрали билеты:");
  });

});