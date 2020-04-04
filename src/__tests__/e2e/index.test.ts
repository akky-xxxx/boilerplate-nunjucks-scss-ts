beforeAll(async () => {
  await page.goto('http://localhost:3000')
})

afterAll(async (done) => {
  done()
})

describe('Home', () => {
  it('ページが表示されること Home', async () => {
    await expect(page).toMatch('top 1')
  })
})
