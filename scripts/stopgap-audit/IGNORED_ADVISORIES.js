/**
 * Advisories `npm run audit:npm` lets through, as a stopgap until a release fixes them.
 *
 * Each entry carries its reason and the condition for removing it,
 * and an entry whose advisory is no longer reported fails the audit,
 * so this list cannot outlive the reasons it was written for.
 *
 * @type {Array<NpmAuditType.IgnoredAdvisory>}
 */
const IGNORED_ADVISORIES = [
  {
    id: 'GHSA-gcqx-w48m-w2h4',
    package: 'deepmerge',
    path: 'jest > @jest/core > jest-config > deepmerge | nuxt > @nuxt/nitro-server > nitropack > @rollup/plugin-node-resolve > deepmerge',
    reason: 'No patched release: the advisory covers deepmerge >=4.2.0 <=4.3.1, and 4.3.1 is the latest. The flaw is prototype poisoning through mergeObject() when a source object carries malicious keys. deepmerge is reached by jest-config and by the Rollup node-resolve plugin of nitropack alone, tools that run on a developer machine or in CI over the configuration of this repository, so it is not shipped and nothing it merges comes from outside.',
    removeWhen: 'deepmerge publishes a release outside <=4.3.1, or jest-config and @rollup/plugin-node-resolve stop depending on deepmerge',
  },
]

export default IGNORED_ADVISORIES
