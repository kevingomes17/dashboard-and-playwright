import { epic, feature, owner, severity, story } from "allure-js-commons"

export type Severity = "blocker" | "critical" | "normal" | "minor" | "trivial"

export type TagOptions = {
  feature: string
  story: string
  severity: Severity
}

const EPIC = "Dashboard"
const OWNER = "dashboard-team"

/**
 * Apply Allure metadata to a test in a single call. Call this at the top of
 * each test body. Epic and owner are constant for this repo.
 */
export async function tagTest(opts: TagOptions): Promise<void> {
  await epic(EPIC)
  await owner(OWNER)
  await feature(opts.feature)
  await story(opts.story)
  await severity(opts.severity)
}
