import { useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { useEffect } from "react";
import "./ExpenseList.css";

export const ExpenseList = () => {
  const [expenses, setExpenses] = useState(
    () => JSON.parse(localStorage.getItem("expenses")) || []
  );
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
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((e) => [...e, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses((ex) => ex.filter((e) => e.id !== id));
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
        <td>
          <button onClick={() => deleteExpense(e.id)}>Delete</button>
        </td>
      </tr>
    ));
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
