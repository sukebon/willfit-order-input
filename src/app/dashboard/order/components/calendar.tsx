import { Box, Flex, Input, NumberInput } from '@mantine/core';
import { format, startOfMonth, endOfMonth, getDay } from 'date-fns';
import { ja } from 'date-fns/locale';
import React from 'react';
import CalendarTableRow from './calendar-table-row';

const Calendar = () => {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const year = Number(format(new Date(), "yyyy"));
  const month = Number(format(new Date(), "MM"));
  const startDate = startOfMonth(new Date()).toLocaleString();
  const endDate = endOfMonth(new Date());
  const countDate = format(endDate, "dd");

  const dayOfWeek = (year: number, month: number, day: number) => {
    const d = getDay(new Date(year, month - 1, day));
    const dayOfWeek = ja.localize?.day(d, { width: 'short' });
    return dayOfWeek;
  };

  const holidays = ["2023-11-3", "2023-11-2"];

  const colorDay = (year: number, month: number, day: number) => {
    const d = getDay(new Date(year, month - 1, day));
    const indludeDay = holidays.includes(`${year}-${month}-${day}`);
    if (indludeDay) {
      return "red";
    }
    switch (d) {
      case 6:
        return "blue";
      case 0:
        return "red";
      default:
        return null;
    }
  };

  return (
    <Box style={{ overflow: "auto" }}>
      <Flex w="2100px">
        {[...Array(Number(countDate)).keys()].map((i) => (
          <Box key={i} w={150} p={1} ta="center">
            <Box>{i + 1}</Box>
            <Box style={{
              color: colorDay(year, month, i + 1) === "blue" ? 'blue' :
                colorDay(year, month, i + 1) === "red" ? "red" : "gray"
            }}>
              {dayOfWeek(year, month, i + 1)}
            </Box>
          </Box>
        ))}
        <Box w={150}>合計</Box>
      </Flex>
      <Flex w="2100px">
        {[...Array(Number(countDate)).keys()].map((i) => (
          <CalendarTableRow key={i} />
        ))}
        <Box w={150}>500</Box>
      </Flex>
    </Box>
  );
};

export default Calendar;