describe('Login and Logout', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000/login');
    await page.type('input[name="email"]', 'test@example.com');
    await page.type('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    await page.waitForResponse('http://localhost:4000/graphql');
  });

  describe('logging in', () => {
    afterEach(async () => {
      await page.click('button[name="logout"]');
    });

    it('displays the current users email, a log out button and redirects to the home page', async () => {
      expect(page.url()).toBe('http://localhost:3000/');

      const text = await page.evaluate(() => document.body.textContent);

      expect(text).toContain('logout');
      expect(text).toContain('test@example.com');
    });
  });

  describe('after logging out', () => {
    let text: string | null;

    it('redirects to the login page and does not display the current users email or a logout button even after refresh', async () => {
      await page.click('button[name="logout"]');

      // not ideal, but waitForNavigation and waitForResponse didn't work here
      await page.waitForTimeout(10);

      expect(page.url()).toBe('http://localhost:3000/login');

      text = await page.evaluate(() => document.body.textContent);

      expect(text).not.toContain('logout');
      expect(text).not.toContain('test@example.com');

      await page.reload();

      // again not ideal, not sure how to wait for the page to fully load
      await page.waitForTimeout(10);

      text = await page.evaluate(() => document.body.textContent);
      expect(text).not.toContain('logout');
      expect(text).not.toContain('test@example.com');
    });
  });
});

export {};
