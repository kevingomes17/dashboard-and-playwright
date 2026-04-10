import { test, expect } from "@playwright/test"
import { tagTest } from "./_allure"

test.describe("Theme toggle", () => {
  test("toggles the dark class on <html>", async ({ page }) => {
    await tagTest({
      feature: "Theme",
      story: "Dark mode toggle",
      severity: "minor",
    })
    await page.goto("/")

    const html = page.locator("html")
    const hasDarkInitially = await html.evaluate((el) =>
      el.classList.contains("dark"),
    )

    await page.getByRole("button", { name: "Toggle theme" }).click()

    await expect
      .poll(async () =>
        html.evaluate((el) => el.classList.contains("dark")),
      )
      .toBe(!hasDarkInitially)

    // Toggle back and confirm we land where we started.
    await page.getByRole("button", { name: "Toggle theme" }).click()
    await expect
      .poll(async () =>
        html.evaluate((el) => el.classList.contains("dark")),
      )
      .toBe(hasDarkInitially)
  })
})
