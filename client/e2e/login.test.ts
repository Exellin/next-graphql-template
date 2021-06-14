describe('Login', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/login');
  });

  it('displays a log out button after logging in', async () => {
    await page.type('input[name="email"]', 'test@example.com');
    await page.type('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    await page.waitForResponse('http://localhost:4000/graphql');

    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('logout');
  });
});

export {};
