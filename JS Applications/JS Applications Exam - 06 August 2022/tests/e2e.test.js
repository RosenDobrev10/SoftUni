const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const host = "http://localhost:3000"; // Application host (NOT service host - that can be anything)
const interval = 600;
const DEBUG = false;
const slowMo = 500;

const mockData = require("./mock-data.json");

const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
  catalog: "/data/offers?sortBy=_createdOn%20desc",
  create: "/data/offers",
  applications: "/data/applications",
  details: (id) => `/data/offers/${id}`,
  delete: (id) => `/data/offers/${id}`,
  total: (offerId) =>
    `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
  own: (offerId, userId) =>
    `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

let browser;
let context;
let page;

describe("E2E tests", function () {
  // Setup
  this.timeout(DEBUG ? 120000 : 10000);
  before(
    async () =>
      (browser = await chromium.launch(
        DEBUG ? { headless: false, slowMo } : {}
      ))
  );
  after(async () => await browser.close());
  beforeEach(async () => {
    context = await browser.newContext();
    setupContext(context);
    page = await context.newPage();
  });
  afterEach(async () => {
    await page.close();
    await context.close();
  });

  // Test proper
  describe("Authentication [ 20 Points ]", () => {
    it("Register does NOT work with empty fields [ 2.5 Points ]", async () => {
      const { post } = await handle(endpoints.register);
      const isCalled = post().isHandled;

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Register");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);

      expect(isCalled()).to.be.false;
    });

    it("Register makes correct API call [ 2.5 Points ]", async () => {
      const data = mockData.users[0];
      const { post } = await handle(endpoints.register);
      const { onRequest } = post(data);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Register");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);
      await page.fill('[name="re-password"]', data.password);

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.email).to.equal(data.email);
      expect(postData.password).to.equal(data.password);
    });

    it("Login does NOT work with empty fields [ 2.5 Points ]", async () => {
      const { post } = await handle(endpoints.login);
      const isCalled = post().isHandled;

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);

      expect(isCalled()).to.be.false;
    });

    it("Login makes correct API call [ 2.5 Points ]", async () => {
      const data = mockData.users[0];
      const { post } = await handle(endpoints.login);
      const { onRequest } = post(data);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");

      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());
      expect(postData.email).to.equal(data.email);
      expect(postData.password).to.equal(data.password);
    });

    it("Logout makes correct API call [ 2.5 Points ]", async () => {
      const data = mockData.users[0];
      const { post } = await handle(endpoints.login);
      const { get } = await handle(endpoints.logout);
      const { onResponse } = post(data);
      const { onRequest } = get("", { json: false, status: 204 });

      await page.goto(host);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");
      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);

      await Promise.all([onResponse(), page.click('[type="submit"]')]);

      await page.waitForTimeout(interval);

      const [request] = await Promise.all([
        onRequest(),
        page.click("nav >> text=Logout"),
      ]);

      const token = request.headers()["x-authorization"];
      expect(request.method()).to.equal("GET");
      expect(token).to.equal(data.accessToken);
    });
  });

  describe("Navigation bar [ 5 Points ]", () => {
    it("Logged user should see correct navigation [ 2.5 Points ]", async () => {
      // Login user
      const data = mockData.users[0];
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);

      await page.click('[type="submit"]');

      //Test for navigation
      await page.waitForTimeout(interval);
      expect(await page.isVisible("text=Dashboard")).to.be.true;
      expect(await page.isVisible("text=Create Offer")).to.be.true;
      expect(await page.isVisible("text=Logout")).to.be.true;

      expect(await page.isVisible("text=Login")).to.be.false;
      expect(await page.isVisible("text=Register")).to.be.false;
    });

    it("Guest user should see correct navigation [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(
        await page.isVisible("nav >> text=Dashboard"),
        "Dashboard is not visible"
      ).to.be.true;
      expect(
        await page.isVisible("nav >> text=Create Offer"),
        "Create is visible"
      ).to.be.false;
      expect(await page.isVisible("nav >> text=Logout"), "Logout is visible").to
        .be.false;

      expect(await page.isVisible("nav >> text=Login"), "Login is not visible")
        .to.be.true;
      expect(
        await page.isVisible("nav >> text=Register"),
        "Ragister is not visible"
      ).to.be.true;
    });
  });

  describe("Home Page [ 10 Points ]", () => {
    it("Show home page [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(await page.isVisible("text=Searching for a job?")).to.be.true;
    });

    it("Show home page [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      expect(
        await page.isVisible("text=The right place for a new career start!")
      ).to.be.true;
    });
  });

  describe("Dashboard Page [ 15 Points ]", () => {
    it("Show Dashboard page - welcome message [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Dashboard");
      await page.waitForTimeout(interval);
      expect(await page.isVisible("text=Job Offers")).to.be.true;
    });

    it("Check Dashboard page with 0 offers [ 2.5 Points ]", async () => {
      const { get } = await handle(endpoints.catalog);
      get([]);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("nav >> text=Dashboard");
      await page.waitForTimeout(interval);

      const visible = await page.isVisible("text=No offers yet.");
      expect(visible).to.be.true;
    });

    it("Check dashboard page with 2 offers [ 2.5 Points ]", async () => {
      const { get } = await handle(endpoints.catalog);
      get(mockData.catalog.slice(0, 2));
      const data = mockData.catalog.slice(0, 2);

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("nav >> text=Dashboard");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      const titles = await page.$$eval(".offer p .title", (t) =>
        t.map((s) => s.textContent)
      );

      expect(titles.length).to.equal(2);
      expect(titles[0]).to.contains(`${data[0].title}`);
      expect(titles[1]).to.contains(`${data[1].title}`);
    });

    it("Show details [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("nav >> text=Dashboard");
      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Details"')).to.be.true;
    });

    it("Check dashboard page Info [ 2.5 Points ]", async () => {
      const { get } = await handle(endpoints.catalog);
      get(mockData.catalog.slice(0, 1));
      const data = mockData.catalog.slice(0, 1);

      await page.goto(host);
      await page.waitForTimeout(interval);

      await page.click("nav >> text=Dashboard");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      const titles = await page.$$eval(".offer p .title", (t) =>
        t.map((s) => s.textContent)
      );
      const salaries = await page.$$eval(".offer p .salary", (t) =>
        t.map((s) => s.textContent)
      );

      expect(titles).to.contains(`${data[0].title}`);
      expect(salaries).to.contains(`${data[0].salary}`);
    });
  });

  describe("CRUD [ 50 Points ]", () => {
    // Login user
    beforeEach(async () => {
      const data = mockData.users[0];
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");
      await page.fill('[name="email"]', data.email);
      await page.fill('[name="password"]', data.password);
      await page.click('[type="submit"]');
      await page.waitForTimeout(interval);
    });

    it("Create does NOT work with empty fields [ 2.5 Points ]", async () => {
      const { post } = await handle(endpoints.create);
      const isCalled = post().isHandled;

      await page.click("text=Create Offer");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");

      page.click('[type="submit"]');

      await page.waitForTimeout(interval);

      expect(isCalled()).to.be.false;
    });

    it("Create makes correct API call for logged in user [ 2.5 Points ]", async () => {
      const data = mockData.catalog[0];
      const { post } = await handle(endpoints.create);
      const { onRequest } = post(data);

      await page.click("text=Create Offer");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");
      await page.fill('[name="title"]', data.title);
      await page.fill('[name="imageUrl"]', data.imageUrl);
      await page.fill('[name="category"]', data.category);
      await page.fill('[name="description"]', data.description);
      await page.fill('[name="requirements"]', data.requirements);
      await page.fill('[name="salary"]', data.salary);

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.title).to.equal(data.title);
      expect(postData.imageUrl).to.equal(data.imageUrl);
      expect(postData.category).to.equal(data.category);
      expect(postData.description).to.equal(data.description);
      expect(postData.requirements).to.equal(data.requirements);
      expect(postData.salary).to.equal(data.salary);
    });

    it("Check details information [ 2.5 Points ]", async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");

      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);

      await page.waitForTimeout(interval);

      const title = await page.$$eval("#details-wrapper p", (t) =>
        t.map((s) => s.textContent)
      );
      const category = await page.$$eval(
        "#details-wrapper p #categories",
        (t) => t.map((s) => s.textContent)
      );
      const salary = await page.$$eval(
        "#details-wrapper p #salary-number",
        (t) => t.map((s) => s.textContent)
      );
      const description = await page.$$eval(
        "#details-wrapper #info-wrapper #details-description span",
        (t) => t.map((s) => s.textContent)
      );
      const requirements = await page.$$eval(
        "#details-wrapper #info-wrapper #details-requirements span",
        (t) => t.map((s) => s.textContent)
      );

      expect(title).to.contains(data.title);
      expect(category).to.contains(data.category);
      expect(salary).to.contains(data.salary);
      expect(description).to.contains(data.description);
      expect(requirements).to.contains(data.requirements);
    });

    it("Non-author does NOT see delete and edit buttons [ 2.5 Points ]", async () => {
      const data = mockData.catalog[2];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector("#dashboard");
      await page.waitForTimeout(interval);

      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);

      expect(await page.isVisible('text="Delete"')).to.be.false;
      expect(await page.isVisible('text="Edit"')).to.be.false;
    });

    it("Author see delete and edit buttons [ 2.5 Points ]", async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);

      await page.waitForTimeout(interval);

      expect(await page.isVisible('text="Delete"')).to.be.true;
      expect(await page.isVisible('text="Edit"')).to.be.true;
    });

    it("Edit should populate form with correct data [ 2.5 Points ]", async () => {
      const data = mockData.catalog[1];
      const user = mockData.users[0];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);

      await page.click("text=Edit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");

      const inputs = await page.$$eval(".form .edit-form input", (t) =>
        t.map((i) => i.value)
      );

      const textareas = await page.$$eval(".edit-form textarea", (t) =>
        t.map((i) => i.value)
      );

      expect(inputs[0]).to.contains(data.title);
      expect(inputs[1]).to.contains(data.imageUrl);
      expect(inputs[2]).to.contains(data.category);
      expect(textareas[0]).to.contains(data.description);
      expect(textareas[1]).to.contains(data.requirements);
      expect(inputs[3]).to.contains(data.salary);
    });

    it("Edit does NOT work with empty fields [ 2.5 Points ]", async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];
      const { get, put } = await handle(endpoints.delete(data._id));
      get(data);
      const { isHandled } = put();

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForTimeout(interval);
      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);

      await page.click("text=Edit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");

      await page.fill('[name="title"]', "");
      await page.fill('[name="imageUrl"]', "");
      await page.fill('[name="category"]', "");
      await page.fill('[name="description"]', "");
      await page.fill('[name="requirements"]', "");
      await page.fill('[name="salary"]', "");

      await page.click('[type="submit"]');
      await page.waitForTimeout(interval);

      expect(isHandled()).to.be.false;
    });

    it("Edit makes correct API call for logged in user [ 2.5 Points ]", async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];

      const { get, put } = await handle(endpoints.delete(data._id));
      get(data);
      const { onRequest } = put(data);

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");

      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForTimeout(interval);
      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);

      await page.click("text=Edit");
      await page.waitForTimeout(interval);

      await page.waitForSelector("form");

      await page.fill('[name="title"]', data.title + "edit");
      await page.fill('[name="category"]', data.category + "edit");
      await page.fill('[name="salary"]', data.salary + "edit");

      const [request] = await Promise.all([
        onRequest(),
        page.click('[type="submit"]'),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.title).to.contains(data.title + "edit");
      expect(postData.category).to.contains(data.category + "edit");
      expect(postData.salary).to.contains(data.salary + "edit");
    });

    it("Delete makes correct API call for logged in user [ 2.5 Points ]", async () => {
      const data = mockData.catalog[0];
      const user = mockData.users[0];

      const { get, del } = await handle(endpoints.delete(data._id));
      get(data);
      const { onResponse, isHandled } = del();

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);

      await page.click("text=Delete");

      page.on("dialog", (dialog) => dialog.accept());
      await Promise.all([onResponse(), page.click('text="Delete"')]);

      expect(isHandled()).to.be.true;
    });
  });

  describe("BONUS : Apply functionality  [ 15 Points ]", async () => {
    it("Apply button is NOT visible for guest users [ 2.5 Points ]", async () => {
      await page.goto(host);
      await page.waitForTimeout(interval);

      const data = mockData.catalog[2];
      const { get } = await handle(endpoints.details(data._id));
      get(data);

      await page.waitForTimeout(interval);
      await page.click("nav >> text=Dashboard");
      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);

      await page.waitForTimeout(interval);

      expect(await page.isVisible("#apply-btn")).to.be.false;
    });

    it("Apply button is visible for the non-creator user [ 2.5 Points ]", async () => {
      // Login user
      const user = mockData.users[0];
      const data = mockData.catalog[2];

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");

      await page.waitForTimeout(interval);
      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);
      await page.waitForTimeout(interval);

      expect(await page.isVisible("#apply-btn")).to.be.true;
    });

    it("Apply button is NOT visible for the creator [ 2.5 Points ]", async () => {
      // Login user
      const user = mockData.users[0];
      const data = mockData.catalog[0];

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      own(0);
      total(5);

      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);

      expect(await page.isVisible("#apply-btn")).to.be.false;
    });

    it("Apply button should be hidden(not visible) after a click on it [ 2.5 Points ]", async () => {
      // Login user
      const user = mockData.users[0];
      const data = mockData.catalog[2];

      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      const { post } = await handle(endpoints.applications, {
        post: mockData.applications[2],
      });
      const { onRequest } = post(mockData.applications[2]);
      own(0);
      total(5);

      await page.waitForTimeout(interval);

      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);
      await page.waitForTimeout(interval);
      expect(await page.isVisible("#apply-btn")).to.be.true;
      own(1);
      total(6);
      await page.waitForTimeout(interval);

      const [request] = await Promise.all([
        onRequest,
        page.click("#apply-btn"),
      ]);

      await page.waitForTimeout(interval);

      expect(await page.isVisible("#apply-btn")).to.be.false;
    });

    it("Apply button should increase total applications by 1 after a click on it [ 2.5 Points ]", async () => {
      // Login user
      const user = mockData.users[0];
      const data = mockData.catalog[2];
      await page.goto(host);
      await page.waitForTimeout(interval);
      await page.click("text=Login");
      await page.waitForTimeout(interval);
      await page.waitForSelector("form");
      await page.fill('[name="email"]', user.email);
      await page.fill('[name="password"]', user.password);
      await page.click('[type="submit"]');

      await page.waitForTimeout(interval);
      await page.click("text=Dashboard");
      await page.waitForTimeout(interval);

      const { get: own } = await handle(endpoints.own(data._id, user._id));
      const { get: total } = await handle(endpoints.total(data._id));
      const { post } = await handle(endpoints.applications, {
        post: mockData.applications[2],
      });
      const { onRequest } = post(mockData.applications[2]);
      await page.waitForTimeout(interval);
      own(0);
      total(5);

      await page.waitForTimeout(interval);
      await page.waitForSelector("#dashboard");
      await page.click(`.offer:has-text("${data.title}") >> .details-btn`);
      await page.waitForTimeout(interval);

      let apps = await page.$$eval("#applications", (t) =>
        t.map((s) => s.textContent)
      );
      expect(apps[0]).to.contains("5");
      own(1);
      total(6);
      await page.waitForTimeout(interval);

      const [request] = await Promise.all([
        onRequest(),
        page.click("#apply-btn"),
      ]);

      await page.waitForTimeout(interval);

      apps = await page.$$eval("#applications", (t) =>
        t.map((s) => s.textContent)
      );
      expect(apps[0]).to.contains("6");
      await page.waitForTimeout(interval);
    });
  });
});

async function setupContext(context) {
  // Authentication
  await handleContext(context, endpoints.login, { post: mockData.users[0] });
  await handleContext(context, endpoints.register, { post: mockData.users[0] });
  await handleContext(context, endpoints.logout, {
    get: (h) => h("", { json: false, status: 204 }),
  });

  // Catalog and Details
  await handleContext(context, endpoints.catalog, { get: mockData.catalog });
  await handleContext(context, endpoints.details("1001"), {
    get: mockData.catalog[0],
  });
  await handleContext(context, endpoints.details("1002"), {
    get: mockData.catalog[1],
  });
  await handleContext(context, endpoints.details("1003"), {
    get: mockData.catalog[2],
  });

  await handleContext(
    endpoints.profile("0001"),
    { get: mockData.catalog.slice(0, 2) },
    context
  );

  await handleContext(endpoints.total("1001"), { get: 6 }, context);
  await handleContext(endpoints.total("1002"), { get: 4 }, context);
  await handleContext(endpoints.total("1003"), { get: 7 }, context);

  await handleContext(endpoints.own("1001", "0001"), { get: 1 }, context);
  await handleContext(endpoints.own("1002", "0001"), { get: 0 }, context);
  await handleContext(endpoints.own("1003", "0001"), { get: 0 }, context);

  // Block external calls
  await context.route(
    (url) => url.href.slice(0, host.length) != host,
    (route) => {
      if (DEBUG) {
        console.log("Preventing external call to " + route.request().url());
      }
      route.abort();
    }
  );
}

function handle(match, handlers) {
  return handleRaw.call(page, match, handlers);
}

function handleContext(context, match, handlers) {
  return handleRaw.call(context, match, handlers);
}

async function handleRaw(match, handlers) {
  const methodHandlers = {};
  const result = {
    get: (returns, options) => request("GET", returns, options),
    post: (returns, options) => request("POST", returns, options),
    put: (returns, options) => request("PUT", returns, options),
    patch: (returns, options) => request("PATCH", returns, options),
    del: (returns, options) => request("DELETE", returns, options),
    delete: (returns, options) => request("DELETE", returns, options),
  };

  const context = this;

  await context.route(urlPredicate, (route, request) => {
    if (DEBUG) {
      console.log(">>>", request.method(), request.url());
    }

    const handler = methodHandlers[request.method().toLowerCase()];
    if (handler == undefined) {
      route.continue();
    } else {
      handler(route, request);
    }
  });

  if (handlers) {
    for (let method in handlers) {
      if (typeof handlers[method] == "function") {
        handlers[method](result[method]);
      } else {
        result[method](handlers[method]);
      }
    }
  }

  return result;

  function request(method, returns, options) {
    let handled = false;

    methodHandlers[method.toLowerCase()] = (route, request) => {
      handled = true;
      route.fulfill(respond(returns, options));
    };

    return {
      onRequest: () => context.waitForRequest(urlPredicate),
      onResponse: () => context.waitForResponse(urlPredicate),
      isHandled: () => handled,
    };
  }

  function urlPredicate(current) {
    if (current instanceof URL) {
      return current.href.toLowerCase().includes(match.toLowerCase());
    } else {
      return current.url().toLowerCase().includes(match.toLowerCase());
    }
  }
}

function respond(data, options = {}) {
  options = Object.assign(
    {
      json: true,
      status: 200,
    },
    options
  );

  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  if (options.json) {
    headers["Content-Type"] = "application/json";
    data = JSON.stringify(data);
  }

  return {
    status: options.status,
    headers,
    body: data,
  };
}
