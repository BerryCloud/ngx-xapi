import {
  Activity,
  ActivityDefinition,
  ChoiceInteractionActivityDefinition,
  FillInInteractionActivityDefinition,
  InteractionComponent,
  LikertInteractionActivityDefinition,
  LongFillInInteractionActivityDefinition,
  MatchingInteractionActivityDefinition,
  NumericInteractionActivityDefinition,
  OtherInteractionActivityDefinition,
  PerformanceInteractionActivityDefinition,
  SequencingInteractionActivityDefinition,
  TrueFalseInteractionActivityDefinition,
} from './activity';

describe('ActivityDefinition', () => {
  it('should create an instance', () => {
    const activityDefinition: ActivityDefinition = {
      name: {
        en: 'Example Activity',
      },
      description: {
        en: 'Example Activity Description',
      },
      type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
      moreInfo: 'http://example.com',
      interactionType: 'other',
      correctResponsesPattern: ['Example Correct Response Pattern'],
      choices: [
        {
          id: 'http://example.com/choices/example-choice',
          description: {
            en: 'Example Choice Description',
          },
        },
      ],
      scale: [
        {
          id: 'http://example.com/scales/example-scale',
          description: {
            en: 'Example Scale Description',
          },
        },
      ],
      source: [
        {
          id: 'http://example.com/sources/example-source',
          description: {
            en: 'Example Source Description',
          },
        },
      ],
      target: [
        {
          id: 'http://example.com/targets/example-target',
          description: {
            en: 'Example Target Description',
          },
        },
      ],
      steps: [
        {
          id: 'http://example.com/steps/example-step',
          description: {
            en: 'Example Step Description',
          },
        },
      ],
      extensions: {
        'http://example.com/extensions/example-extension':
          'Example Extension Value',
      },
    };

    expect(activityDefinition).toBeTruthy();
  });
});

describe('InteractionComponent', () => {
  it('should create an instance', () => {
    const interactionComponent: InteractionComponent = {
      id: 'http://example.com/interaction-component',
      description: {
        en: 'Example Interaction Component Description',
      },
    };

    expect(interactionComponent).toBeTruthy();
  });
});

describe('TrueFalseInteractionActivityDefinition', () => {
  it('should create an instance', () => {
    const trueFalseInteractionActivityDefinition: TrueFalseInteractionActivityDefinition =
      {
        name: {
          en: 'Example True/False Activity',
        },
        description: {
          en: 'Example True/False Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        interactionType: 'true-false',
        correctResponsesPattern: ['true'],
      };

    expect(trueFalseInteractionActivityDefinition).toBeTruthy();
  });
});

describe('ChoiceInteractionActivityDefinition', () => {
  it('should create an instance', () => {
    const choiceInteractionActivityDefinition: ChoiceInteractionActivityDefinition =
      {
        name: {
          en: 'Example Choice Activity',
        },
        description: {
          en: 'Example Choice Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        interactionType: 'choice',
        choices: [
          {
            id: 'http://example.com/choices/example-choice',
            description: {
              en: 'Example Choice Description',
            },
          },
        ],
      };

    expect(choiceInteractionActivityDefinition).toBeTruthy();
  });
});

describe('FillInInteractionActivityDefinition', () => {
  it('should create an instance', () => {
    const fillInInteractionActivityDefinition: FillInInteractionActivityDefinition =
      {
        name: {
          en: 'Example Fill-In Activity',
        },
        description: {
          en: 'Example Fill-In Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        interactionType: 'fill-in',
        correctResponsesPattern: ['Example Correct Response Pattern'],
      };

    expect(fillInInteractionActivityDefinition).toBeTruthy();
  });
});

describe('LongFillInInteractionActivityDefinition', () => {
  it('should create an instance', () => {
    const longFillInInteractionActivityDefinition: LongFillInInteractionActivityDefinition =
      {
        name: {
          en: 'Example Long Fill-In Activity',
        },
        description: {
          en: 'Example Long Fill-In Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        interactionType: 'long-fill-in',
        correctResponsesPattern: ['Example Correct Response Pattern'],
      };

    expect(longFillInInteractionActivityDefinition).toBeTruthy();
  });
});

describe('MatchingInteractionActivityDefinition', () => {
  it('should create an instance', () => {
    const matchingInteractionActivityDefinition: MatchingInteractionActivityDefinition =
      {
        name: {
          en: 'Example Matching Activity',
        },
        description: {
          en: 'Example Matching Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        interactionType: 'matching',
        source: [
          {
            id: 'http://example.com/sources/example-source',
            description: {
              en: 'Example Source Description',
            },
          },
        ],
        target: [
          {
            id: 'http://example.com/targets/example-target',
            description: {
              en: 'Example Target Description',
            },
          },
        ],
      };

    expect(matchingInteractionActivityDefinition).toBeTruthy();
  });
});

describe('PerformanceInteractionActivityDefinition', () => {
  it('should create an instance', () => {
    const performanceInteractionActivityDefinition: PerformanceInteractionActivityDefinition =
      {
        name: {
          en: 'Example Performance Activity',
        },
        description: {
          en: 'Example Performance Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        interactionType: 'performance',
        steps: [
          {
            id: 'http://example.com/steps/example-step',
            description: {
              en: 'Example Step Description',
            },
          },
        ],
      };

    expect(performanceInteractionActivityDefinition).toBeTruthy();
  });
});

describe('SequencingInteractionActivityDefinition', () => {
  it('should create an instance', () => {
    const sequencingInteractionActivityDefinition: SequencingInteractionActivityDefinition =
      {
        name: {
          en: 'Example Sequencing Activity',
        },
        description: {
          en: 'Example Sequencing Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        interactionType: 'sequencing',
        correctResponsesPattern: ['Example Correct Response Pattern'],
        choices: [
          {
            id: 'http://example.com/choices/example-choice1',
            description: {
              en: 'Example Choice Description 1',
            },
          },
          {
            id: 'http://example.com/choices/example-choice2',
            description: {
              en: 'Example Choice Description 2',
            },
          },
        ],
      };

    expect(sequencingInteractionActivityDefinition).toBeTruthy();
  });
});

describe('LikertInteractionActivityDefinition', () => {
  it('should create an instance', () => {
    const likertInteractionActivityDefinition: LikertInteractionActivityDefinition =
      {
        name: {
          en: 'Example Likert Activity',
        },
        description: {
          en: 'Example Likert Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        interactionType: 'likert',
        scale: [
          {
            id: 'http://example.com/scales/example-scale',
            description: {
              en: 'Example Scale Description',
            },
          },
        ],
      };

    expect(likertInteractionActivityDefinition).toBeTruthy();
  });
});

describe('NumericInteractionActivityDefinition', () => {
  it('should create an instance', () => {
    const numericInteractionActivityDefinition: NumericInteractionActivityDefinition =
      {
        name: {
          en: 'Example Numeric Activity',
        },
        description: {
          en: 'Example Numeric Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        correctResponsesPattern: ['Example Correct Response Pattern'],
        interactionType: 'numeric',
      };

    expect(numericInteractionActivityDefinition).toBeTruthy();
  });
});

describe('OtherInteractionActivityDefinition', () => {
  it('should create an instance', () => {
    const otherInteractionActivityDefinition: OtherInteractionActivityDefinition =
      {
        name: {
          en: 'Example Other Activity',
        },
        description: {
          en: 'Example Other Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        interactionType: 'other',
      };

    expect(otherInteractionActivityDefinition).toBeTruthy();
  });
});

describe('Activity', () => {
  it('should create an instance', () => {
    const activity: Activity = {
      id: 'http://example.com/activities/example-activity',
      definition: {
        name: {
          en: 'Example Activity',
        },
        description: {
          en: 'Example Activity Description',
        },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        moreInfo: 'http://example.com',
        interactionType: 'other',
      },
    };

    expect(activity).toBeTruthy();
  });
});
