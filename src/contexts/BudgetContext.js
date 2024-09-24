import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/LocalStorageHook";

const BudgetContext = React.createContext();
export function useBudgets() {
  return useContext(BudgetContext);
}

// expense : {id}
export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expensess", []);
  const [expensesStorage, setExpensesStorage] = useLocalStorage(
    "expensesStorage",
    []
  );
  const [page, setPage] = useState(0);

  function getBudgetExpenses(id) {
    return expenses.filter((expense) => expense.budgetId === id);
  }

  function addExpense({ description, amount, budgetId, week, month, year }) {
    const newExpense = {
      id: uuidV4(),
      description,
      amount,
      budgetId,
      week,
      month,
      year,
      day: new Date().getDay() == 0 ? 6 : new Date().getDay() - 1,
    };

    // Update both expenses and expensesStorage
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, newExpense];
      setExpensesStorage(updatedExpenses); // Update expensesStorage with the latest expenses
      return updatedExpenses;
    });
  }

  function editExpense({ id, description, amount }) {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, description, amount } : expense
      );
      setExpensesStorage(updatedExpenses); // Update expensesStorage with the latest expenses
      return updatedExpenses;
    });
  }

  function deleteExpense(id) {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter(
        (expense) => expense.id !== id
      );
      setExpensesStorage(updatedExpenses); // Update expensesStorage with the latest expenses
      return updatedExpenses;
    });
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function getExpensesOfWeek(week) {
    let y = new Date().getFullYear();
    return expensesStorage.filter(
      (expense) => expense.week === week && expense.year === y
    );
  }

  function getExpensesOfMonth(month) {
    let y = new Date().getFullYear();
    return expensesStorage.filter(
      (expense) => expense.month === month && expense.year === y
    );
  }

  function getExpensesOfYear(year) {
    return expensesStorage.filter((expense) => expense.year === year);
  }

  function deleteBudget(id) {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function saveAndReset(id) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  // Other utility functions...
  function swapPage(index) {
    page === 1 ? setPage(0) : setPage(1);
  }

  function weekNumber(date = new Date()) {
    var firstJanuary = new Date(date.getFullYear(), 0, 1);
    var dayNr = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
    var weekNr = Math.ceil((dayNr + firstJanuary.getDay()) / 7);
    return weekNr;
  }

  function formatAmount(e) {
    let str = e.toString();
    if (str.length > 9) {
      str =
        str.substring(0, str.length % 9) +
        "," +
        formatAmount(str.substring(str.length % 9));
      return str;
    }
    if (str.length > 6) {
      str =
        str.substring(0, str.length % 6) +
        "," +
        formatAmount(str.substring(str.length % 6));
      return str;
    }
    if (str.length == 6) {
      str = str.substring(0, 3) + "," + str.substring(3);
      return str;
    }
    if (str.length > 3) {
      str =
        str.substring(0, str.length % 3) + "," + str.substring(str.length % 3);
      return str;
    }
    if (str.length <= 3) return str;
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        expensesStorage,
        page,
        saveAndReset,
        formatAmount,
        weekNumber,
        swapPage,
        getExpensesOfWeek,
        getBudgetExpenses,
        editExpense,
        getExpensesOfMonth,
        getExpensesOfYear,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
