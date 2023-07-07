import { Actor } from './actor';

/**
 * An Agent (an individual) is a persona or system.
 */
export interface Agent extends Actor {
  invalid?: string; // TODO remove property

  // TODO make lint
}
