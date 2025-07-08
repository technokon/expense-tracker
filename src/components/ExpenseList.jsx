import { useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { useEffect } from "react";
import "./ExpenseList.css";

export const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      Math.floor(
        Math.round(
          expenses
            .map((e) => Number(e.amount))
            .reduce((acc, cur) => acc + cur, 0) * 100
        )
      ) / 100
    );
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((e) => [...e, expense]);
  };

  if (!expenses.length) {
    return (
      <>
        <div>No Expenses yet, please add</div>
        <ExpenseForm onAdd={addExpense} />
      </>
    );
  }

  const renderExpenses = () => {
    return expenses.map((e) => (
      <tr key={e.id}>
        <td>{e.description}</td>
        <td>${e.amount}</td>
      </tr>
    ));
  };

  const getTableStyle = () => {
    return {
      width: "100%",
      border: "1px solid black",
      borderCollapse: "collapse",
    };
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {renderExpenses()}
          <tr>
            <td></td>
            <td className="total">
              <strong>${total}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <ExpenseForm onAdd={addExpense} />
      </div>
    </>
  );
};
