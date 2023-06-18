import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

// A helper function to get the number of days in a month
const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// A helper function to get the day of the week for the first day of a month
const getFirstDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay();
};

// A component that renders a single cell of the calendar
const CalendarCell = ({
  date,
  isCurrentMonth,
}: {
  date: number;
  isCurrentMonth: boolean;
}) => {
  return (
    <Box
      flex="1"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={isCurrentMonth ? "white" : "gray.100"}
      border="1px solid gray.200"
    >
      <Text fontSize="sm" color={isCurrentMonth ? "black" : "gray.400"}>
        {date}
      </Text>
    </Box>
  );
};

// A component that renders a row of the calendar
const CalendarRow = ({
  week,
  isCurrentMonth,
}: {
  week: number[];
  isCurrentMonth: boolean;
}) => {
  return (
    <Flex h="14.28%">
      {week.map((date) => (
        <CalendarCell key={date} date={date} isCurrentMonth={isCurrentMonth} />
      ))}
    </Flex>
  );
};

// A component that renders the calendar
const Calendar = ({ month, year }: { month: number; year: number }) => {
  // The names of the days of the week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // The number of days in the current month
  const daysInMonth = getDaysInMonth(month, year);

  // The day of the week for the first day of the current month
  const firstDayOfMonth = getFirstDayOfMonth(month, year);

  // The number of days in the previous month
  const daysInPrevMonth = getDaysInMonth(month - 1, year);

  // The dates for the previous month that are visible on the calendar
  const prevMonthDates = Array.from(
    { length: firstDayOfMonth },
    (_, i) => daysInPrevMonth - i
  ).reverse();

  // The dates for the current month
  const currentMonthDates = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  // The dates for the next month that are visible on the calendar
  const nextMonthDates = Array.from(
    { length: 42 - prevMonthDates.length - currentMonthDates.length },
    (_, i) => i + 1
  );

  // The dates for the whole calendar
  const allDates = [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];

  // The dates grouped by week (7 days)
  const weeks = [];
  for (let i = 0; i < allDates.length; i += 7) {
    weeks.push(allDates.slice(i, i + 7));
  }

  return (
    <Box w="100%" h="100vh" p="4">
      <Heading as="h3" size="md" mb="4" textAlign="center">
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </Heading>
      <Flex mb="2">
        {days.map((day) => (
          <Box
            key={day}
            flex="1"
            h="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="sm" fontWeight="bold" color="gray.500">
              {day}
            </Text>
          </Box>
        ))}
      </Flex>
      {weeks.map((week, i) => (
        <CalendarRow
          key={i}
          week={week}
          isCurrentMonth={i > 0 || week[6] <= daysInMonth}
        />
      ))}
    </Box>
  );
};

export default Calendar;
