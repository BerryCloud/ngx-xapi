import { Extensions } from './extensions';
import { LanguageMap } from './language-map';

interface ActivityDefinitionType {
  name?: LanguageMap;
  description?: LanguageMap;
  type?: string; // Should be IRI
  moreInfo?: string; // Should be IRI
  extensions?: Extensions;
}

interface InteractionActivityDefinitionType extends ActivityDefinitionType {
  type: 'http://adlnet.gov/expapi/activities/cmi.interaction';
  correctResponsesPattern?: string[];
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
  choices?: InteractionComponent[];
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
  scale?: InteractionComponent[];
}

export interface MatchingInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'matching';
  source?: InteractionComponent[];
  target?: InteractionComponent[];
}

export interface PerformanceInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'performance';
  steps?: InteractionComponent[];
}

export interface SequencingInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'sequencing';
  choices?: InteractionComponent[];
}

export interface NumericInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'numeric';
}

export interface OtherInteractionActivityDefinition
  extends InteractionActivityDefinitionType {
  interactionType: 'other';
}

export type ActivityDefinition =
  | ActivityDefinitionType
  | TrueFalseInteractionActivityDefinition
  | ChoiceInteractionActivityDefinition
  | FillInInteractionActivityDefinition
  | LongFillInInteractionActivityDefinition
  | LikertInteractionActivityDefinition
  | MatchingInteractionActivityDefinition
  | PerformanceInteractionActivityDefinition
  | SequencingInteractionActivityDefinition
  | NumericInteractionActivityDefinition
  | OtherInteractionActivityDefinition;

export interface Activity {
  objectType: 'Activity';
  id: string; // Should be IRI
  definition?: ActivityDefinition;
}
