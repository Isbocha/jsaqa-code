let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    await page.setDefaultTimeout(60000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  });

  test("The first link attribute", async () => {
        await page.setDefaultTimeout(60000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
        await page.setDefaultTimeout(60000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});


test("Sigh up page test", async () => {
  // await page.setDefaultTimeout(60000);
  await page.goto("https://github.com/signup");
  // const firstLink = await page.$(".js-build-in .bx-lg-2 .color-bg-overlay a");
  // const firstLink = await page.$("header .flex-1 a");
  // const firstLink = await page.$("header>div>div>div>a");
  // const firstLink = await page.$("header div div div");
  // await firstLink.click();
  const btnSelector = "#email-container > div > label";
  await page.waitForSelector(btnSelector, {
    visible: true,
  });
  const actual = await page.$eval(btnSelector, (link) => link.textContent);
  expect(actual).toContain("Enter your email");
}, 60000);


test("Sigh in page test", async () => {
  await page.setDefaultTimeout(60000);
  await page.goto("https://github.com/login");
  await page.waitForSelector('h1');
  const btnSelector = "#email-container > div > label";
  const title2 = await page.title();
      expect(title2).toEqual('Sign in to GitHub · GitHub');
    });


test("Issues page test", async () => {
    // await page.goto("https://github.com/features/issues");
 const buttonLabel = await page.$(".Button-label");
 await buttonLabel.click();
 const buttonProduct = await page.$(".header-menu-wrapper .HeaderMenu-item button");
 await buttonProduct.click(buttonProduct);
 const buttonIssue = await page.$(".HeaderMenu-dropdown ul li .octicon-issue-opened ~ div div");
 await buttonIssue.click(buttonIssue);
  const actual = await page.$eval(".mx-auto h1", (link) => link.textContent);
      expect(actual).toEqual("Project planning for developers");
    }, 60000);