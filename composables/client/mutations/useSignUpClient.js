import SignUpMutationGraphqlLauncher from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlLauncher'

export function useSignUpClient () {
  return {
    sendSignUp,
  }

  /**
   * Fetch signUp.
   *
   * @param {{
   *   variables: {
   *     input: {
   *       email: string
   *       username?: string
   *       firstName?: string
   *       lastName?: string
   *       password: string
   *     }
   *   }
   * }} params - Parameters.
   * @returns {Promise<import('~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlCapsule')>}
   */
  async function sendSignUp ({
    variables,
  }) {
    const launcher = SignUpMutationGraphqlLauncher.create()

    const capsule = await launcher.launchRequestWithVariables({
      variables,
    })

    return capsule
  }
}
