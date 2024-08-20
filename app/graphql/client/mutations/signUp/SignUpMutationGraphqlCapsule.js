import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * Sign up mutation GraphQL capsule.
 *
 * @extends {BaseAppGraphqlCapsule<typeof SignUpMutationGraphqlCapsule, SignUpMutationResponseContent>}
 */
export default class SignUpMutationGraphqlCapsule extends BaseAppGraphqlCapsule {

}

/**
 * @typedef {{
 *   sentTo: string
 * }} SignUpMutationResponseContent
 */
