import { Extensions } from './extensions';
import { LanguageMap } from './language-map';

<<<<<<< HEAD
/**
 * This interface represents the xAPI Activity Definition object.
 * <p>
 * Upon receiving a Statement with an Activity Definition that differs from the one stored, an LRS
 * SHOULD ... change the definition and SHOULD update the stored Activity Definition.
 * </p>
 * <p>
 * When two ActivityDefinitions are merged, the properties and lists are replaced and the maps are
 * merged.
 * </p>
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#activity-definition">xAPI
 *      Activity Definition</a>
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#lrs-requirements-1">LRS
 *      Requirements</a>
 */
interface ActivityDefinition {
  /**
   * The human readable/visual name of the Activity.
   */
  name?: LanguageMap;

  /**
   * A description of the Activity.
   */
  description?: LanguageMap;

  /**
   * The type of Activity.
   */
  type?: string; // Should be IRI

  /**
   * Resolves to a document with human-readable information about the Activity, which could include
   * a way to launch the activity.
   */
  moreInfo?: string; // Should be IRI

  /**
   * The type of interaction.
   */
  interactionType?: string;

  /**
   * A pattern representing the correct response to the interaction. The structure of this pattern
   * varies depending on the interactionType.
   */
  correctResponsesPattern?: string[];

  /**
   * A list of the options available in the interaction for selection or ordering.
   */
  choices?: InteractionComponent[];

  /**
   * A list of the options on the likert scale.
   */
  scale?: InteractionComponent[];

  /**
   * Lists of sources to be matched.
   */
  source?: InteractionComponent[];

  /**
   * Lists of targets to be matched.
   */
  target?: InteractionComponent[];

  /**
   * A list of the elements making up the performance interaction.
   */
  steps?: InteractionComponent[];

  /**
   * A map of other properties as needed.
   */
  extensions?: Extensions;
}

interface InteractionActivityDefinitionType extends ActivityDefinition {
  type: 'http://adlnet.gov/expapi/activities/cmi.interaction';
}

/**
 * This interface represents the xAPI Interaction Component object.
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-components">xAPI
 *      Interaction Components</a>
 */
export interface InteractionComponent {
  /**
   * Identifies the interaction component within the list.
   */
  id: string;

  /**
   * A description of the interaction component.
   */
  description: LanguageMap;
}

/**
 * This interface represents the xAPI Activity Definition object for a True/False interaction.
 * <p>
 * An interaction with two possible responses: true or false.
 * </p>
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types">
 *      Interaction Types</a>
 */
export interface TrueFalseInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'true-false';
  correctResponsesPattern?: ['true'] | ['false'];
}

/**
 * This interface represents the xAPI Activity Definition object for a Multiple Choice interaction.
 * <p>
 * An interaction with a number of possible choices from which the learner can select.
 * This includes interactions in which the learner can select only one answer from the list and
 * those where the learner can select multiple items.
 * </p>
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types">
 *      Interaction Types</a>
 */
export interface ChoiceInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'choice';
  choices: InteractionComponent[];
}

/**
 * This interface represents the xAPI Activity Definition object for a Fill-in interaction.
 * <p>
 * An interaction which requires the learner to supply a short response in the form of one or
 *  more strings of characters. Typically, the correct response consists of part of a word,
 *  one word or a few words. "Short" means that the correct responses pattern and learner
 *  response strings will normally be 250 characters or less.
 * </p>
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types">
 *      Interaction Types</a>
 */
export interface FillInInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'fill-in';
}

/**
 * This interface represents the xAPI Activity Definition object for a Long Fill-in interaction.
 * <p>
 * An interaction which requires the learner to supply a response in the form of a long
 * string of characters. "Long" means that the correct responses pattern and learner response
 * strings will normally be more than 250 characters.
 * </p>
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types">
 *      Interaction Types</a>
 */
export interface LongFillInInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'long-fill-in';
}

/**
 * This interface represents the xAPI Activity Definition object for a Matching interaction.
 * <p>
 * An interaction where the learner is asked to match items in one set (the source set) to
 * items in another set (the target set). Items do not have to pair off exactly and it is
 *  possible for multiple or zero source items to be matched to a given target and vice versa.
 * </p>
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types">
 *      Interaction Types</a>
 */
export interface MatchingInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'matching';
  source: InteractionComponent[];
  target: InteractionComponent[];
}

/**
 * This interface represents the xAPI Activity Definition object for a Performance interaction.
 * <p>
 * An interaction that requires the learner to perform a task that requires multiple steps.
 * </p>
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types">
 *      Interaction Types</a>
 */
export interface PerformanceInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'performance';
  steps: InteractionComponent[];
}

/**
 * This interface represents the xAPI Activity Definition object for a Sequencing interaction.
 * <p>
 * An interaction where the learner is asked to order items in a set.
 * </p>
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types">
 *      Interaction Types</a>
 */
export interface SequencingInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'sequencing';
  choices: InteractionComponent[];
}

/**
 * This interface represents the xAPI Activity Definition object for a Likert interaction.
 * <p>
 * An interaction which asks the learner to select from a discrete set of choices on a scale/
 * </p>
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types">
 *      Interaction Types</a>
 */
export interface LikertInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'likert';
  scale: InteractionComponent[];
}

/**
 * This interface represents the xAPI Activity Definition object for a Numeric interaction.
 * <p>
 * Any interaction which requires a numeric response from the learner.
 * </p>
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types">
 *      Interaction Types</a>
 */
export interface NumericInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'numeric';
}

/**
 * This interface represents the xAPI Activity Definition object for a Other interaction.
 * <p>
 * Another type of interaction that does not fit into other defined types.
 * </p>
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types">
 *      Interaction Types</a>
 */
export interface OtherInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'other';
}

/**
 * This class represents the xAPI Activity object.
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#2441-when-the-objecttype-is-activity">xAPI
 *      Activity</a>
 */
export interface Activity {
  objectType?: 'Activity';

  /**
   * An identifier for a single unique Activity.
   */
=======
interface ActivityDefinition {
  name?: LanguageMap;
  description?: LanguageMap;
  type?: string; // Should be IRI
  moreInfo?: string; // Should be IRI
  extensions?: Extensions;

  interactionType?: string;
  correctResponsesPattern?: string[];

  choices?: InteractionComponent[];
  scale?: InteractionComponent[];
  source?: InteractionComponent[];
  target?: InteractionComponent[];
  steps?: InteractionComponent[];
}

interface InteractionActivityDefinitionType extends ActivityDefinition {
  type: 'http://adlnet.gov/expapi/activities/cmi.interaction';
}

export interface InteractionComponent {
  id: string;
  description: LanguageMap;
}

export interface TrueFalseInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'true-false';
  correctResponsesPattern?: ['true'] | ['false'];
}

export interface ChoiceInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'choice';
  choices: InteractionComponent[];
}

export interface FillInInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'fill-in';
}

export interface LongFillInInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'long-fill-in';
}

export interface LikertInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'likert';
  scale: InteractionComponent[];
}

export interface MatchingInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'matching';
  source: InteractionComponent[];
  target: InteractionComponent[];
}

export interface PerformanceInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'performance';
  steps: InteractionComponent[];
}

export interface SequencingInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'sequencing';
  choices: InteractionComponent[];
}

export interface NumericInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'numeric';
}

export interface OtherInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'other';
}

export interface Activity {
  objectType?: 'Activity';
>>>>>>> refs/remotes/origin/main
  id: string; // Should be IRI

  /**
   * Metadata for the Activity.
   */
  definition?: ActivityDefinition;
}
