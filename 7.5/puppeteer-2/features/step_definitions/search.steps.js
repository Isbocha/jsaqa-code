const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After
} = require("cucumber");
const {
  clickElement,
  getText
} = require("../../lib/commands.js");

let page;

Before(async function () {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50
  });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(string);
});

When("user chooses {int} day", async function (int) {
  const element = "body > nav > a:nth-child(3)";
  await this.page.waitForSelector(element);
  return await clickElement(this.page, element);
});

When("user chooses first film", async function () {
  const itemNumber = ".movie-seances__time-block";
  return await clickElement(this.page, itemNumber);
});

When("user chooses the {int} place on the {int} row", async function (int, int) {
  const seat = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(7)";
  await this.page.waitForSelector(seat);
  return await clickElement(this.page, seat);
});

When("user again chooses the {int} place on the {int} row", async function (int, int) {
  const seat = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(7)";
  await this.page.waitForSelector(seat);
  return await clickElement(this.page, seat);
});

When("user presses the button", async function () {
  await this.page.waitForSelector(".acceptin-button");
  return await clickElement(this.page, ".acceptin-button");
});

Then("user sees a page for booking tickets for the movie: {string}.", async function (string) {
  const actual = await getText(this.page, ".buying__info-title");
  const expected = string;
  expect(actual).contains(expected);
});

Then("user goes to the booking page of the selected place and sees a button with the text: {string}.", async function (string) {
  const actual = await getText(this.page, ".acceptin-button");
  const expected = string;
  expect(actual).contains(expected);
});

Then("user sees button {string} become disable", async function (string) {
  const actual = await this.page.$eval("button", (link) =>
    link.getAttribute("disabled")
  );
  const expected = "true";
  expect(actual).equal(expected);
});