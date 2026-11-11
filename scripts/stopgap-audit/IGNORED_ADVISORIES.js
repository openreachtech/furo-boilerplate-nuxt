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
]

export default IGNORED_ADVISORIES
