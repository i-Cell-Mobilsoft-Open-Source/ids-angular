/**
 * A validation error's representation that maps an error message (or a function returning a message) to an error code.
 */
export interface IdsErrorMessageMapping {
  /** The code of the error (usually the error key returned by a {@link ValidatorFn}) */
  code: string;
  /** The error's message (either a string literal or a function that returns a literal) */
  message: string | (() => string);
}
