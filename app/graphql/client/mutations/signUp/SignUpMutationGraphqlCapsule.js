import {
  BaseGraphqlCapsule,
} from '@openreachtech/furo'

/**
 * Sign up mutation GraphQL capsule.
 *
 * @extends {BaseGraphqlCapsule<typeof SignUpMutationGraphqlCapsule, SignUpMutationResponseContent>}
 */
export default class SignUpMutationGraphqlCapsule extends BaseGraphqlCapsule {

}

/**
 * @typedef {{
 *   sentTo: string
 * }} SignUpMutationResponseContent
 */
