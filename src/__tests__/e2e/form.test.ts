beforeAll(async () => {
  await page.goto('http://localhost:3000/form/')
})

afterAll(async (done) => {
  done()
})

describe('Home', () => {
  it('ページが表示されること Form', async () => {
    await expect(page).toMatch('入力してくだしい')
  })
})
