export const Message = {
  HINT: 'hint',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export type MessageType = (typeof Message)[keyof typeof Message];
