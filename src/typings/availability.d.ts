export type AvailabilityItems = {
  _id?: string;
  monday: WorkingHours;
  tuesday: WorkingHours;
  wednesday: WorkingHours;
  thursday: WorkingHours;
  friday: WorkingHours;
  saturday: WorkingHours;
  sunday: WorkingHours;
  includeHolidays: boolean;
  user: string;
  month: string;
};

export type WorkingHours = {
  _id?: string;
  from: Date;
  to: Date;
  isClosed: boolean;
};
