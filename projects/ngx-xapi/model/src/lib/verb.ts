import { LanguageMap } from './language-map';

export interface Verb {
  id: string; // Should be IRI

  display?: LanguageMap;
}

export const answered: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/answered',
  display: { en: 'answered' },
};

export const asked: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/asked',
  display: { en: 'asked' },
};

export const attempted: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/attempted',
  display: { en: 'attempted' },
};

export const attended: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/attended',
  display: { en: 'attended' },
};

export const commented: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/commented',
  display: { en: 'commented' },
};

export const completed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/completed',
  display: { en: 'completed' },
};

export const exited: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/exited',
  display: { en: 'exited' },
};

export const experienced: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/experienced',
  display: { en: 'experienced' },
};

export const failed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/failed',
  display: { en: 'failed' },
};

export const imported: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/imported',
  display: { en: 'imported' },
};

export const initialized: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/initialized',
  display: { en: 'initialized' },
};

export const interacted: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/interacted',
  display: { en: 'interacted' },
};

export const launched: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/launched',
  display: { en: 'launched' },
};

export const mastered: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/mastered',
  display: { en: 'mastered' },
};

export const passed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/passed',
  display: { en: 'passed' },
};

export const preferred: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/preferred',
  display: { en: 'preferred' },
};

export const progressed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/progressed',
  display: { en: 'progressed' },
};

export const registered: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/registered',
  display: { en: 'registered' },
};

export const responded: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/responded',
  display: { en: 'responded' },
};

export const resumed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/resumed',
  display: { en: 'resumed' },
};

export const scored: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/scored',
  display: { en: 'scored' },
};

export const shared: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/shared',
  display: { en: 'shared' },
};

export const suspended: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/suspended',
  display: { en: 'suspended' },
};

export const terminated: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/terminated',
  display: { en: 'terminated' },
};

export const voided: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/voided',
  display: { en: 'voided' },
};

export const abandoned: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/abandoned',
  display: { en: 'abandoned' },
};

export const loggedIn: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/logged-in',
  display: { en: 'logged in' },
};

export const loggedOut: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/logged-out',
  display: { en: 'logged out' },
};

export const satisfied: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/satisfied',
  display: { en: 'satisfied' },
};

export const waived: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/waived',
  display: { en: 'waived' },
};
