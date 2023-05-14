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
      <form
        ref={formRef}
        onSubmit={submitHandler}
        className="max-w-lg mx-auto bg-white rounded p-6 shadow-md mt-6"
      >
        <label className="block mb-2 font-medium text-gray-800">
          Expense Amount
        </label>
        <input
          type="number"
          id="amount"
          className="border border-gray-300 rounded px-3 py-2 mb-3 w-full"
        />
        <label className="block mb-2 font-medium text-gray-800">
          Expense Description
        </label>
        <input
          type="text"
          id="description"
          className="border border-gray-300 rounded px-3 py-2 mb-3 w-full"
        />
        <label className="block mb-2 font-medium text-gray-800">
          Select Category
        </label>
        <select
          id="category"
          className="border border-gray-300 rounded px-3 py-2 mb-3 w-full"
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="utilities">Utilities</option>
          <option value="transportation">Transportation</option>
          <option value="other">Other</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
      </form>
      <ul className="max-w-lg mx-auto mt-6">
        {amount && description && category && (
          <li className="bg-white shadow-md rounded p-4 mb-4">
            <span className="font-medium">Amount: </span>
            {amount} |{" "}
            <span className="font-medium">Description: </span>
            {description} |{" "}
            <span className="font-medium">Category: </span>
            {category}
          </li>
        )}
      </ul>
    </>
  );
}
