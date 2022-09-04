const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const host = "http://localhost:3000"; // Application host (NOT service host - that can be anything)
const interval = 300;
const DEBUG = false;
const slowMo = 500;

const mockData = {
  "posts": [
    {
      "_id": "1001",
      "title": "Front-end Development",
      "username": "George",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    },
    {
      "_id": "1002",
      "title": "Angular 10",
      "username": "David",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      "_id": "1003",
      "title": "JS Advanced course",
      "username": "Johny",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
  ],
  "comment": [
    {
      "text":"Great Post",
      "username":"Peter",
      "postId":"1001",
      "_id":"2001"
    }
  ]
}
const endpoints = {
  create: "/jsonstore/collections/myboard/posts",
  catalog: "/jsonstore/collections/myboard/posts",
  comments: "/jsonstore/collections/myboard/comments",
};

let browser;
let context;
let page;

describe("E2E tests", function () {
  // Setup
  this.timeout(DEBUG ? 120000 : 7000);
  before(async () => browser = await chromium.launch(DEBUG ? { headless: false, slowMo } : {}));
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

  describe("Forum", () => {

    it("Show Posts", async () => {
      const data = mockData.posts;
      const { get } = await handle(endpoints.catalog);
      get(data);
      await page.goto(host);

      await page.waitForTimeout(interval);

      const form = await page.$$eval('.topic-container .topic-name-wrapper', t => t.map(i => i.textContent));

      expect(form.length).to.be.equal(data.length);

    });

    it("Create post", async () => {
      const data = mockData.posts[0];
      const { post } = await handle(endpoints.create);
      const { onRequest } = post();
      await page.goto(host);

      await page.waitForSelector("form");
      await page.fill('.new-topic-title >> [name="topicName"]', data.title);
      await page.fill(
        '.new-topic-title >> [name="username"]',
        data.username
      );
      await page.fill(
        '.new-topic-content >> [name="postText"]',
        data.content
      );

      const [request] = await Promise.all([
        onRequest(),
        page.click(".public"),
      ]);

      const postData = JSON.parse(request.postData());
      expect(postData.title).to.equal(data.title);
      expect(postData.username).to.equal(data.username);
      expect(postData.content).to.contains(data.content);
    });

    it("Check post title", async () => {
      const data = mockData.posts[0];
      const { get } = await handle(endpoints.catalog);
      get(data);
      await page.goto(host);

      await page.waitForTimeout(interval);

      await page.click(
        `.topic-container .topic-name-wrapper .topic-name >> a h2`
      );

      const form = await page.$$eval('.container .theme-title >> .theme-name h2', t => t.map(i => i.textContent));

      expect(form[0]).to.be.equal(data.title);

    });

    it("Check username", async () => {
      const data = mockData.posts[0];
      const { get } = await handle(endpoints.catalog);
      get(data);
      await page.goto(host);

      await page.waitForTimeout(interval);

      await page.click(
        `.topic-container .topic-name-wrapper .topic-name >> a h2`
      );

      const form = await page.$$eval('.container .comment p span', t => t.map(i => i.textContent));
      expect(form[0]).to.be.equal(data.username);

    });

    it("Check describtion", async () => {
      const data = mockData.posts[0];
      const { get } = await handle(endpoints.catalog);
      get(data);
      await page.goto(host);

      await page.waitForTimeout(interval);

      await page.click(
        `.topic-container .topic-name-wrapper .topic-name >> a h2`
      );

      const form = await page.$$eval('.container .comment p .post-content', t => t.map(i => i.textContent));
      expect(form[0]).to.be.equal(data.description);

    });

    it("Check is comment field is available", async () => {
      const data = mockData.posts[0];
      const { get } = await handle(endpoints.catalog);
      get(data);
      await page.goto(host);

      await page.waitForTimeout(interval);

      await page.click(
        `.topic-container .topic-name-wrapper .topic-name >> a h2`
      );

      expect(await page.isVisible('.answer-comment textarea')).to.be.true;

    });

    it("Check is comment field is available", async () => {
      const data = mockData.posts[0];
      const { get } = await handle(endpoints.catalog);
      get(data);
      await page.goto(host);

      await page.waitForTimeout(interval);

      await page.click(
        `.topic-container .topic-name-wrapper .topic-name >> a h2`
      );

      await page.waitForSelector('.answer')

      await page.fill('.answer [name="postText"]', 'Yeah'); 
      await page.fill('.answer [name="username"]', 'Peter'); 
      await page.click('.answer >> text="Post"');

      const { post } = await handle(endpoints.comments);
      const isCalled = post().isHandled;

      expect(isCalled()).to.be.false;

    });

    it("Check cancel button", async () => {
      const data = mockData.posts[0];
      await page.goto(host);

      await page.waitForSelector("form");
      await page.fill('.new-topic-title >> [name="topicName"]', data.title);
      await page.fill(
        '.new-topic-title >> [name="username"]',
        data.username
      );
      await page.fill(
        '.new-topic-content >> [name="postText"]',
        data.content
      );

      await page.click('.cancel');

      const form = await page.$$eval('.container .new-topic-title input', t => t.map(i => i.textContent));
      expect(form[0]).to.equal('');
      expect(form[1]).to.equal('');
    });

  });
});

async function setupContext(context) {

  // Catalog and Details
  await handleContext(context, endpoints.catalog, { get: mockData.catalog });
  await handleContext(context, endpoints.create, { get: mockData.catalog });
  
  await handleContext(endpoints.comments('1001'), { get: mockData.comments }, context);

  // Block external calls
  await context.route(url => url.href.slice(0, host.length) != host, route => {
    if (DEBUG) {
      console.log('Preventing external call to ' + route.request().url());
    }
    route.abort();
  });
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
    get: (returns, options) => request('GET', returns, options),
    post: (returns, options) => request('POST', returns, options),
    put: (returns, options) => request('PUT', returns, options),
    patch: (returns, options) => request('PATCH', returns, options),
    del: (returns, options) => request('DELETE', returns, options),
    delete: (returns, options) => request('DELETE', returns, options)
  };

  const context = this;

  await context.route(urlPredicate, (route, request) => {
    if (DEBUG) {
      console.log('>>>', request.method(), request.url());
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
      if (typeof handlers[method] == 'function') {
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
};

function respond(data, options = {}) {
  options = Object.assign({
    json: true,
    status: 200
  }, options);

  const headers = {
    'Access-Control-Allow-Origin': '*'
  };
  if (options.json) {
    headers['Content-Type'] = 'application/json';
    data = JSON.stringify(data);
  }

  return {
    status: options.status,
    headers,
    body: data
  };
}