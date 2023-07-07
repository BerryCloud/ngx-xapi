import { Extensions } from './extensions';
import { InteractionComponent } from './interaction-component';
import { LanguageMap } from './language-map';

export interface ActivityDefinition {
  name?: LanguageMap;

  description?: LanguageMap;

  type?: string; // Should be IRI

  moreInfo?: string; // Should be IRI

  interactionType?: InteractionType;

  correctResponsesPattern?: string[];

  choices?: InteractionComponent[];

  scale?: InteractionComponent[];

  source?: InteractionComponent[];

  target?: InteractionComponent[];

  steps?: InteractionComponent[];

  extensions?: Extensions;
}

enum InteractionType {
  TrueFalse = 'true-false',
  Choice = 'choice',
  FillIn = 'fill-in',
  LongFillIn = 'long-fill-in',
  Matching = 'matching',
  Performance = 'performance',
  Sequencing = 'sequencing',
  Likert = 'likert',
  Numeric = 'numeric',
  Other = 'other',
}
