<script>
import {
  defineComponent,
  ref,
  shallowRef,
} from 'vue'

import {
  useRoute,
} from 'vue-router'

import {
  definePageMeta,
} from '#imports'

import {
  useGraphqlClient,
  useFormClerk,
} from '@openreachtech/furo-nuxt'

import useSubscriptionGraphqlClient from '@openreachtech/furo-nuxt/lib/composables/useSubscriptionGraphqlClient.js'

import ChatRoomPageContext from './ChatRoomPageContext.js'
import ChatRoomSubscriptionContext from './ChatRoomSubscriptionContext.js'

import ChatMessagesQueryGraphqlLauncher from '@/app/graphql/client/queries/chatMessages/ChatMessagesQueryGraphqlLauncher.js'

import OnObserveChatStatesGraphqlSubscriber from '@/app/graphql/client/subscriptions/onObserveChatStates/OnObserveChatStatesGraphqlSubscriber.js'

import SendChatMessageFormElementClerk from './SendChatMessageFormElementClerk.js'
import SendChatMessageMutationGraphqlLauncher from '@/app/graphql/client/mutations/sendChatMessage/SendChatMessageMutationGraphqlLauncher.js'

import ChatDatabase from '@/app/db/chat/ChatDatabase.js'

const chatDatabase = await ChatDatabase.createAsync()

export default defineComponent({
  name: 'IndexPage',

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Chat Room',
        // skipFilter: true,
      },
    })

    const route = useRoute()

    // -------------------------------------------------------------------------

    /*
     * Chat page context
     */
    const sendChatMessagesGraphqlClient = useGraphqlClient(SendChatMessageMutationGraphqlLauncher)
    const chatMessagesGraphqlClient = useGraphqlClient(ChatMessagesQueryGraphqlLauncher)

    const sendChatMessageFormClerk = useFormClerk({
      FormElementClerk: SendChatMessageFormElementClerk,
      invokeRequestWithFormValueHash: sendChatMessagesGraphqlClient.invokeRequestWithFormValueHash,
    })

    const sendChatMessageFormRef = shallowRef(null)

    const args = {
      props,
      componentContext,

      route,

      graphqlClientHash: {
        chatMessages: chatMessagesGraphqlClient,
      },

      formClerkHash: {
        sendChatMessage: sendChatMessageFormClerk,
      },
    }
    const context = ChatRoomPageContext.create(args)
      .setupComponent()

    // -------------------------------------------------------------------------

    /*
     * Chat messages subscription context
     */
    const displayMessagesRef = ref([])

    const chatMessagesSubscriptionGraphqlClient = useSubscriptionGraphqlClient(OnObserveChatStatesGraphqlSubscriber)

    const chatStatesContextArgs = {
      props,
      componentContext,

      route,

      subscriptionGraphqlClient: chatMessagesSubscriptionGraphqlClient,
      queryGraphqlClientHash: {
        chatMessages: chatMessagesGraphqlClient,
      },
      chatDatabase,
      displayMessagesRef,
    }
    const chatStatesContext = ChatRoomSubscriptionContext.create(chatStatesContextArgs)
      .setupComponent()

    return {
      context,
      chatStatesContext,

      sendChatMessageFormRef,
    }
  },
})
</script>

<template>
  <section class="unit-page">
    <h1>Chat Room</h1>

    <section class="unit-section">
      <div id="messages"
        class="unit-messages"
      >
        <div v-for="it in chatStatesContext.generateDisplayMessageEntities()"
          :key="it.id"
        >
          <div>
            <strong>{{ it.sender }}</strong>
            <span style="
              width: 1rem;

              display: inline-block;

              text-align: center;
            "
            >:</span>
            <span>{{ it.content }}</span>
          </div>
        </div>
      </div>

      <form ref="sendChatMessageFormRef"
        class="unit-form"
        style="
          width: 100%;
          max-width: 30rem;

          display: flex;
          flex-direction: row;
          gap: 0.25rem;

          align-items: flex-start;
          justify-content: center;
        "
        @submit.prevent="context.submitFormToSendChatMessage({
          formElement: sendChatMessageFormRef,
        })"
      >
        <input type="text"
          name="content"
          required
          placeholder="Input chat message"
          style="
            flex-grow: 1;
          "
        >

        <button type="submit">
          Send Chat Message
        </button>
      </form>
    </section>
  </section>
</template>

<style scoped>
.unit-messages {
  margin-block-end: 0.5rem;

  border: var(--size-thinnest) solid var(--color-border);

  height: 20rem;

  padding-block: 0.25rem;
  padding-inline: 0.5rem;

  overflow: auto;
}
</style>
