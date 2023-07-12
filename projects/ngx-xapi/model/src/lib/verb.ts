import { LanguageMap } from './language-map';

/**
 * The Verb defines the action between an Actor and an Activity.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#243-verb | xAPI Verb}
 */
export interface Verb {
  /**
   * Corresponds to a Verb definition. Each Verb definition corresponds to the meaning of a Verb,
   * not the word.
   */
  id: string; // Should be IRI

  /**
   * The human readable representation of the Verb in one or more languages. This does not have any
   * impact on the meaning of the Statement, but serves to give a human-readable display of the
   * meaning already determined by the chosen Verb.
   */
  display?: LanguageMap;
}

/**
 * Indicates the actor replied to a question, where the object is generally an activity
 * representing the question. The text of the answer will often be included in the response inside
 * result.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const answered: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/answered',
  display: { en: 'answered' },
};

/**
 * Indicates an inquiry by an actor with the expectation of a response or answer to a question.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const asked: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/asked',
  display: { en: 'asked' },
};

/**
 * Indicates the actor made an effort to access the object. An attempt statement without
 * additional activities could be considered incomplete in some cases.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const attempted: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/attempted',
  display: { en: 'attempted' },
};

/**
 * Indicates the actor was present at a virtual or physical event or activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const attended: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/attended',
  display: { en: 'attended' },
};

/**
 * Indicates the actor provided digital or written annotations on or about an object.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const commented: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/commented',
  display: { en: 'commented' },
};

/**
 * Indicates the actor finished or concluded the activity normally.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const completed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/completed',
  display: { en: 'completed' },
};

/**
 * Indicates the actor intentionally departed from the activity or object.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const exited: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/exited',
  display: { en: 'exited' },
};

/**
 * Indicates the actor only encountered the object, and is applicable in situations where a
 * specific achievement or completion is not required.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const experienced: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/experienced',
  display: { en: 'experienced' },
};

/**
 * Indicates the actor did not successfully pass an activity to a level of predetermined
 * satisfaction.
 *
 * @see {@link https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/ec3b0c8c-db7c-4bb5-8c2d-0bb6ff387e15 | SCORM Profile}
 */
export const failed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/failed',
  display: { en: 'failed' },
};

/**
 * Indicates the actor introduced an object into a physical or virtual location.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const imported: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/imported',
  display: { en: 'imported' },
};

/**
 * Indicates the activity provider has determined that the actor successfully started an activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/ec3b0c8c-db7c-4bb5-8c2d-0bb6ff387e15 | SCORM Profile}
 */
export const initialized: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/initialized',
  display: { en: 'initialized' },
};

/**
 * Indicates the actor engaged with a physical or virtual object.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const interacted: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/interacted',
  display: { en: 'interacted' },
};

/**
 * Indicates the actor attempted to start an activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const launched: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/launched',
  display: { en: 'launched' },
};

/**
 * Indicates the highest level of comprehension or competence the actor performed in an activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const mastered: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/mastered',
  display: { en: 'mastered' },
};

/**
 * Indicates the actor successfully passed an activity to a level of predetermined satisfaction.
 *
 * @see {@link https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/ec3b0c8c-db7c-4bb5-8c2d-0bb6ff387e15 | SCORM Profile}
 */
export const passed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/passed',
  display: { en: 'passed' },
};

/**
 * Indicates the selected choices, favoured options or settings of an actor in relation to an
 * object or activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const preferred: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/preferred',
  display: { en: 'preferred' },
};

/**
 * Indicates a value of how much of an actor has advanced or moved through an activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const progressed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/progressed',
  display: { en: 'progressed' },
};

/**
 * Indicates the actor is officially enrolled or inducted in an activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const registered: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/registered',
  display: { en: 'registered' },
};

/**
 * Indicates an actor reacted or replied to an object.
 *
 * @see {@link https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/ec3b0c8c-db7c-4bb5-8c2d-0bb6ff387e15 | SCORM Profile}
 */
export const responded: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/responded',
  display: { en: 'responded' },
};

/**
 * Indicates the application has determined that the actor continued or reopened a suspended
 * attempt on an activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/ec3b0c8c-db7c-4bb5-8c2d-0bb6ff387e15 | SCORM Profile}
 */
export const resumed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/resumed',
  display: { en: 'resumed' },
};

/**
 * Indicates a numerical value related to an actor's performance on an activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/ec3b0c8c-db7c-4bb5-8c2d-0bb6ff387e15 | SCORM Profile}
 */
export const scored: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/scored',
  display: { en: 'scored' },
};

/**
 * Indicates the actor's intent to openly provide access to an object of common interest to other
 * actors or groups.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const shared: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/shared',
  display: { en: 'shared' },
};

/**
 * Indicates the status of a temporarily halted activity when an actor's intent is returning to
 * the or object activity at a later time.
 *
 * @see {@link https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/ec3b0c8c-db7c-4bb5-8c2d-0bb6ff387e15 | SCORM Profile}
 */
export const suspended: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/suspended',
  display: { en: 'suspended' },
};

/**
 * Indicates that the actor successfully ended an activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/ec3b0c8c-db7c-4bb5-8c2d-0bb6ff387e15 | SCORM Profile}
 */
export const terminated: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/terminated',
  display: { en: 'terminated' },
};

/**
 * A special reserved verb used by a LRS or application to mark a statement as invalid. See the
 * xAPI specification for details on Voided statements.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const voided: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/voided',
  display: { en: 'voided' },
};

/**
 * Indicates that the AU session was abnormally terminated by a learner's action (or due to a
 * system failure).
 *
 * @see {@link https://profiles.adlnet.gov/profile/a929b474-9518-45a2-bd47-24696c602754/concepts/582cbd06-8920-4748-917f-5c1af8244a82 | cmi5 Profile}
 */
export const abandoned: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/abandoned',
  display: { en: 'abandoned' },
};

/**
 * Indicates the actor gained access to a system or service by identifying and authenticating with
 * the credentials provided by the actor.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const loggedIn: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/logged-in',
  display: { en: 'logged in' },
};

/**
 * Indicates the actor either lost or discontinued access to a system or service.
 *
 * @see {@link https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860 | ADL Vocabulary}
 */
export const loggedOut: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/logged-out',
  display: { en: 'logged out' },
};

/**
 * Indicates that the authority or activity provider determined the actor has fulfilled the
 * criteria of the object or activity.
 *
 * @see {@link https://profiles.adlnet.gov/profile/a929b474-9518-45a2-bd47-24696c602754/concepts/582cbd06-8920-4748-917f-5c1af8244a82 | cmi5 Profile}
 */
export const satisfied: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/satisfied',
  display: { en: 'satisfied' },
};

/**
 * Indicates that the learning activity requirements were met by means other than completing the
 * activity. A waived statement is used to indicate that the activity may be skipped by the actor.
 *
 * @see {@link https://profiles.adlnet.gov/profile/a929b474-9518-45a2-bd47-24696c602754/concepts/582cbd06-8920-4748-917f-5c1af8244a82 | cmi5 Profile}
 */
export const waived: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/waived',
  display: { en: 'waived' },
};
