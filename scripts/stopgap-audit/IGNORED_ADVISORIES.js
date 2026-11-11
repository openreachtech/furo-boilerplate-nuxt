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
  {
    id: 'GHSA-vjh5-4x84-xrqp',
    package: 'nuxt',
    path: 'nuxt',
    reason: 'Patched only in nuxt 4.6.2; the 3.x line gets no patched release and its latest is 3.21.11. furo-nuxt 2.1.0 accepts nuxt 4 as a peer, but this boilerplate declares nuxt@^3.21.11. The flaw skips `routeRules` for case-variant paths, and this repository declares no `routeRules` and has no `server/` directory, so there is no rule to skip.',
    removeWhen: '`nuxt` 4 is adopted by this boilerplate',
  },
  {
    id: 'GHSA-xfq5-w38q-pc2x',
    package: 'nuxt',
    path: 'nuxt',
    reason: 'Patched only in nuxt 4.6.2; the 3.x line gets no patched release and its latest is 3.21.11. furo-nuxt 2.1.0 accepts nuxt 4 as a peer, but this boilerplate declares nuxt@^3.21.11. The flaw is in server islands rendering `useHeadSafe` input, and this repository sets `ssr: false` and uses neither `NuxtIsland` nor `useHeadSafe`.',
    removeWhen: '`nuxt` 4 is adopted by this boilerplate',
  },
  {
    id: 'GHSA-jjm6-p2m9-9w4x',
    package: 'nuxt',
    path: 'nuxt',
    reason: 'Patched only in nuxt 4.6.0; the 3.x line gets no patched release and its latest is 3.21.11. furo-nuxt 2.1.0 accepts nuxt 4 as a peer, but this boilerplate declares nuxt@^3.21.11. The flaw runs a `javascript:` URL from `<NuxtLink>` when `pages` is disabled, and this repository keeps `pages` enabled and uses no `<NuxtLink>`.',
    removeWhen: '`nuxt` 4 is adopted by this boilerplate',
  },
]

export default IGNORED_ADVISORIES
