export type ServiceProps = {
  name: string;
  description?: string;
  price: number;
  duration: number;
  id: string;
};

export type TimeStatus = "available" | "booked" | "unavailable";

export type TimeStatusProps = {
  time: string;
  status: TimeStatus;
};

export type SelectDateProps = {
  date: Date;
  times: TimeStatusProps[];
  id: string;
};
