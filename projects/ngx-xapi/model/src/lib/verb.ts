import { LanguageMap } from './language-map';

/**
 * The Verb defines the action between an Actor and an Activity.
 *
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#243-verb">xAPI
 *      Verb</a>
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
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c0d5a500-886e-4e85-9cea-121f07c79860">ADL
 *      Vocabulary</a>
 */
export const answered: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/answered',
  display: { en: 'answered' },
};

/**
 * Indicates an inquiry by an actor with the expectation of a response or answer to a question.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/d0b07cfd-9924-4b22-a427-24917b779d6a">ADL
 *      Vocabulary</a>
 */
export const asked: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/asked',
  display: { en: 'asked' },
};

/**
 * Indicates the actor made an effort to access the object. An attempt statement without
 * additional activities could be considered incomplete in some cases.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/69bda7e4-9266-4c6d-9886-d461a1cb47af">ADL
 *      Vocabulary</a>
 */
export const attempted: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/attempted',
  display: { en: 'attempted' },
};

/**
 * Indicates the actor was present at a virtual or physical event or activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/5714e638-f51e-4201-9267-41a927d96ce4">ADL
 *      Vocabulary</a>
 */
export const attended: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/attended',
  display: { en: 'attended' },
};

/**
 * Indicates the actor provided digital or written annotations on or about an object.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/91bb8f4c-b939-4443-916d-01bacc6c9dc3">ADL
 *      Vocabulary</a>
 */
export const commented: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/commented',
  display: { en: 'commented' },
};

/**
 * Indicates the actor finished or concluded the activity normally.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/f915b946-26a0-4bbb-91ac-b327dae81b32">SCORM
 *      Profile</a>
 */
export const completed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/completed',
  display: { en: 'completed' },
};

/**
 * Indicates the actor intentionally departed from the activity or object.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/9c2e9b32-f77f-47c4-8931-0ce3e6657164">ADL
 *      Vocabulary</a>
 */
export const exited: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/exited',
  display: { en: 'exited' },
};

/**
 * Indicates the actor only encountered the object, and is applicable in situations where a
 * specific achievement or completion is not required.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/d1ce0546-7173-4908-90b3-b23af711fa08">ADL
 *      Vocabulary</a>
 */
export const experienced: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/experienced',
  display: { en: 'experienced' },
};

/**
 * Indicates the actor did not successfully pass an activity to a level of predetermined
 * satisfaction.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/ec3b0c8c-db7c-4bb5-8c2d-0bb6ff387e15">SCORM
 *      Profile</a>
 */
publ;
export const failed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/failed',
  display: { en: 'failed' },
};

/**
 * Indicates the actor introduced an object into a physical or virtual location.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/1e5568e9-28c1-4d5d-b1d4-e58530cae8b7">ADL
 *      Vocabulary</a>
 */
export const imported: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/imported',
  display: { en: 'imported' },
};

/**
 * Indicates the activity provider has determined that the actor successfully started an activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/b588ec23-50cb-4790-a108-0693c6baf514">SCORM
 *      Profile</a>
 */
export const initialized: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/initialized',
  display: { en: 'initialized' },
};

/**
 * Indicates the actor engaged with a physical or virtual object.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/7c0d37e7-1b8c-429d-ac9a-9450749a39bf">ADL
 *      Vocabulary</a>
 */
export const interacted: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/interacted',
  display: { en: 'interacted' },
};

/**
 * Indicates the actor attempted to start an activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/c9d327c6-b545-4401-8c07-a9c4390bcff6">ADL
 *      Vocabulary</a>
 */
export const launched: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/launched',
  display: { en: 'launched' },
};

/**
 * Indicates the highest level of comprehension or competence the actor performed in an activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/783aece0-f6e1-445c-a405-7eb1778d5f1a">ADL
 *      Vocabulary</a>
 */
export const mastered: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/mastered',
  display: { en: 'mastered' },
};

/**
 * Indicates the actor successfully passed an activity to a level of predetermined satisfaction.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/4636348d-f7ae-429e-acf4-31a4ad4690a9">SCORM
 *      Profile</a>
 */
export const passed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/passed',
  display: { en: 'passed' },
};

/**
 * Indicates the selected choices, favoured options or settings of an actor in relation to an
 * object or activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/353a9d12-ce12-49e7-bf56-1389c345ca6b">ADL
 *      Vocabulary</a>
 */
export const preferred: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/preferred',
  display: { en: 'preferred' },
};

/**
 * Indicates a value of how much of an actor has advanced or moved through an activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/87bdffde-c526-4fb1-823f-2359ed46a313">ADL
 *      Vocabulary</a>
 */
export const progressed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/progressed',
  display: { en: 'progressed' },
};

/**
 * Indicates the actor is officially enrolled or inducted in an activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/48c6f781-b1b6-4585-825c-48242855e23c">ADL
 *      Vocabulary</a>
 */
export const registered: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/registered',
  display: { en: 'registered' },
};

/**
 * Indicates an actor reacted or replied to an object.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/b645166d-7587-461f-9588-1912a1db9cda">SCORM
 *      Profile</a>
 */
export const responded: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/responded',
  display: { en: 'responded' },
};

/**
 * Indicates the application has determined that the actor continued or reopened a suspended
 * attempt on an activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/28d8ea98-85e7-4853-a617-5cee2d5993e2">SCORM
 *      Profile</a>
 */
export const resumed: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/resumed',
  display: { en: 'resumed' },
};

/**
 * Indicates a numerical value related to an actor's performance on an activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/6a515f49-2a89-4b79-97ec-dd7ea8e7632f">SCORM
 *      Profile</a>
 */
export const scored: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/scored',
  display: { en: 'scored' },
};

/**
 * Indicates the actor's intent to openly provide access to an object of common interest to other
 * actors or groups.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/de5ca3d8-02a8-4b0b-a744-b2e5ea966ea4">ADL
 *      Vocabulary</a>
 */
export const shared: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/shared',
  display: { en: 'shared' },
};

/**
 * Indicates the status of a temporarily halted activity when an actor's intent is returning to
 * the or object activity at a later time.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/f90ef5f3-1bbb-4eb2-a97b-609f678b8311">SCORM
 *      Profile</a>
 */
export const suspended: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/suspended',
  display: { en: 'suspended' },
};

/**
 * Indicates that the actor successfully ended an activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/b4a24801-c630-4990-ac80-6281b794e311/concepts/dc797b4b-066b-4d18-b343-78b9403b76ad">SCORM
 *      Profile</a>
 */
export const terminated: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/terminated',
  display: { en: 'terminated' },
};

/**
 * A special reserved verb used by a LRS or application to mark a statement as invalid. See the
 * xAPI specification for details on Voided statements.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/9f2374fe-a811-4012-800c-e4dbc9e5c5cb">ADL
 *      Vocabulary</a>
 */
export const voided: Verb = {
  id: 'http://adlnet.gov/expapi/verbs/voided',
  display: { en: 'voided' },
};

/**
 * Indicates that the AU session was abnormally terminated by a learner's action (or due to a
 * system failure).
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/a929b474-9518-45a2-bd47-24696c602754/concepts/63799980-a0fb-4ead-9ed2-25f7a65734f5">cmi5
 *      Profile</a>
 */
export const abandoned: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/abandoned',
  display: { en: 'abandoned' },
};

/**
 * Indicates the actor gained access to a system or service by identifying and authenticating with
 * the credentials provided by the actor.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/b5bea04f-3f49-4b9d-a7e9-4202af00dd4c">ADL
 *      Vocabulary</a>
 */
export const loggedIn: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/logged-in',
  display: { en: 'logged in' },
};

/**
 * Indicates the actor either lost or discontinued access to a system or service.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/3270df72-2d3a-40fe-adf6-86db6d8671b1/concepts/7ce10260-ffa0-4d0f-a5c3-ed795e60b276">ADL
 *      Vocabulary</a>
 */
export const loggedOut: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/logged-out',
  display: { en: 'logged out' },
};

/**
 * Indicates that the authority or activity provider determined the actor has fulfilled the
 * criteria of the object or activity.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/a929b474-9518-45a2-bd47-24696c602754/concepts/e3212e03-237f-4684-8f65-e27c7375d30b">cmi5
 *      Profile</a>
 */
export const satisfied: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/satisfied',
  display: { en: 'satisfied' },
};

/**
 * Indicates that the learning activity requirements were met by means other than completing the
 * activity. A waived statement is used to indicate that the activity may be skipped by the actor.
 *
 * @see <a href=
 *      "https://profiles.adlnet.gov/profile/a929b474-9518-45a2-bd47-24696c602754/concepts/582cbd06-8920-4748-917f-5c1af8244a82">cmi5
 *      Profile</a>
 */
export const waived: Verb = {
  id: 'https://w3id.org/xapi/adl/verbs/waived',
  display: { en: 'waived' },
};
