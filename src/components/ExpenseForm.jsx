import { useRef } from "react";

export const ExpenseForm = ({ onAdd }) => {
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
      id: Date.now(),
    });
    descriptionRef.current.value = "";
    amountRef.current.value = "";
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="description-input">Description</label>
      <input ref={descriptionRef} id="description-input" type="text" />
      <label htmlFor="amount-input">Amount</label>
      <input
        ref={amountRef}
        id="amount-input"
        type="number"
        step="0.01"
        min="0"
      />
      <button type="submit">Add</button>
    </form>
  );
};
