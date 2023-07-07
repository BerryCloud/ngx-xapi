import { Verb } from '@berry-cloud/ngx-xapi/model';

export class Verbs {
  static readonly launched: Verb = {
    id: 'http://adlnet.gov/expapi/verbs/launched',
    display: { en: 'launched' },
  };

  static readonly registered: Verb = {
    id: 'http://adlnet.gov/expapi/verbs/registered',
    display: { en: 'registered' },
  };

  static readonly initialized: Verb = {
    id: 'http://adlnet.gov/expapi/verbs/initialized',
    display: { en: 'initialized' },
  };

  static readonly terminated: Verb = {
    id: 'http://adlnet.gov/expapi/verbs/terminated',
    display: {
      en: 'terminated',
    },
  };

  static readonly progressed: Verb = {
    id: 'http://adlnet.gov/expapi/verbs/progressed',
    display: {
      en: 'progressed',
    },
  };

  static readonly answered: Verb = {
    id: 'http://adlnet.gov/expapi/verbs/answered',
    display: {
      en: 'answered',
    },
  };

  static readonly experienced: Verb = {
    id: 'http://adlnet.gov/expapi/verbs/experienced',
    display: {
      en: 'experienced',
    },
  };

  static readonly completed: Verb = {
    id: 'http://adlnet.gov/expapi/verbs/completed',
    display: { en: 'completed' },
  };

  static readonly passed: Verb = {
    id: 'http://adlnet.gov/expapi/verbs/passed',
    display: {
      en: 'passed',
    },
  };

  static readonly failed: Verb = {
    id: 'http://adlnet.gov/expapi/verbs/failed',
    display: {
      en: 'failed',
    },
  };
}
