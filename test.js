const { seleniumWD } = require("promod");

const { browser, $, getDriver } = seleniumWD;

describe("search", async function () {
    this.timeout(75_000);

    beforeEach(async function () {
        const host = process.env.SELENIUM || "selenium";
        const server = `http://${host}:4444`;
        await getDriver(
            {
                seleniumAddress: server,
                capabilities: {
                    browserName: "chrome",
                    "goog:chromeOptions": {
                        args: ["--headless", "--disable-gpu"],
                    },
                },
            },
            browser
        );
        await browser.runNewBrowser({ newBrowserName: "second" });
        console.log("browser 2");
        await browser.runNewBrowser({ newBrowserName: "third" });
        console.log("browser 3");
    });

    // After each test, take a screenshot and close the browser
    afterEach(async function () {
        await browser.quitAll();
    });

    // Our test definitions
    it("google", async function () {
        await browser.get("https://google.com");
        console.log(await browser.getCurrentUrl());
        await browser.switchToBrowser({ browserName: "second" });
        await browser.get("https://www.youtube.com/");
        console.log(await browser.getCurrentUrl());
        await browser.switchToBrowser({ browserName: "third" });
        await browser.get("https://www.selenium.dev/");
        console.log(await browser.getCurrentUrl());

        this.timeout(25_000);
    });
});
