import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'

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
