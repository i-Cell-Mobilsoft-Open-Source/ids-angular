// eslint-disable-next-line @typescript-eslint/naming-convention
export const IdsDatepickerView = {
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
} as const;

export type IdsDatepickerViewType = (typeof IdsDatepickerView)[keyof typeof IdsDatepickerView];
