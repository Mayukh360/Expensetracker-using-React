import React, { useRef, useState } from "react";

export default function ExpenseTracker() {
  const formRef = useRef();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const submitHandler = (event) => {
    event.preventDefault();
    const amountInput = formRef.current.elements.amount.value;
    const descriptionInput = formRef.current.elements.description.value;
    const categoryInput = formRef.current.elements.category.value;
    console.log(amountInput, descriptionInput, categoryInput);
    setAmount(amountInput);
    setDescription(descriptionInput);
    setCategory(categoryInput);
  };
  return (
    <>
      <form ref={formRef} onSubmit={submitHandler}>
        <label>Expense Amount</label>
        <input type="number" id="amount" />
        <label>Expense Description</label>
        <input type="text" id="description" />
        <select id="category">
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="utilities">Utilities</option>
          <option value="transportation">Transportation</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {amount && description && category && (
          <li>
            Amount :{amount}--- Descrition :{description}--- Category :{category}
          </li>
        )}
      </ul>
    </>
  );
}
