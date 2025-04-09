// hooks/useMonthNavigation.js
import { useState } from 'react';
import { getExpensesByMonth } from '../../services/expenses/getExpenses';
import { dateWithoutYear } from './components/ExpenseList/utils/dateWithoutYear';

const useMonthNavigation = (currentMonth, setExpensesData) => {
  const [monthState, setMonthState] = useState(currentMonth);

  const navigateMonth = (direction) => {
    setMonthState((prev) => {
      let newMonthIndex = prev.monthIndex + direction;
      let newYear = prev.year;

      if (newMonthIndex < 0) {
        newMonthIndex = 11;
        newYear = (parseInt(prev.year) - 1).toString();
      } else if (newMonthIndex > 11) {
        newMonthIndex = 0;
        newYear = (parseInt(prev.year) + 1).toString();
      }

      const newMonth = new Date(newYear, newMonthIndex).toLocaleString("en-US", { month: "long" });
      getExpensesByMonth(newYear, newMonth)
        .then((e) => setExpensesData({
          monthExpenses: dateWithoutYear(e.monthExpenses),
          monthTotal: e.monthTotal,
        }));

      return {
        month: newMonth,
        monthIndex: newMonthIndex,
        year: newYear,
      };
    });
  };

  return { monthState, navigateMonth };
};

export default useMonthNavigation;
