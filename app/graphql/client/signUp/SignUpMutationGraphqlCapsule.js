import BaseGraphqlCapsule from '~/modules/client/BaseGraphqlCapsule'

/**
 * Sign up mutation GraphQL capsule.
 *
 * @extends {BaseGraphqlCapsule<typeof SignUpMutationGraphqlCapsule, SignUpContent>}
 */
export default class SignUpMutationGraphqlCapsule extends BaseGraphqlCapsule {

}

/**
 * @typedef {{
 *   sentTo: string
 * }} SignUpContent
 */
