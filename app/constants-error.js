/*
 * Backend error codes are dotted strings, keyed here by a semantic name so a call site never
 * hardcodes a code. A name maps to a single code or an array of codes (same shape as other apps'
 * `constants-error.js`). Only the codes the frontend must react to are listed; add more as needed.
 */
export const ERROR_CODE_HASH = {
  Unauthenticated: '102.X000.001',
  RefreshTokenReused: '205.M003.001',
}
