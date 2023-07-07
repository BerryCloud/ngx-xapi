import { Actor } from './actor';
import { Agent } from './agent';

/**
 * A Group represents a collection of Agents and can be used in most of the
 * same situations an Agent can be used. There are two types of Groups:
 * Anonymous Groups and Identified Groups.
 */
export interface Group extends Actor {
  name?: string;
  member?: Agent[];
}
