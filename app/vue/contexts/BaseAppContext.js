import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * BaseAppContext
 *
 * @template {typeof import('@openreachtech/furo-nuxt').BaseFuroContextAccessor<*> | null} [A = null] - ContextAccessor class.
 * @template {import('vue').ComponentCustomProps} [P = {}] - Props.
 * @template {string | null} [EE = null] - emit() event names.
 * @extends {BaseFuroContext<A, P, EE>}
 */
export default class BaseAppContext extends BaseFuroContext {

}
