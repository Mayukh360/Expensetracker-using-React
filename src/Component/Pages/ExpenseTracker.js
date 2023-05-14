import React, { useRef, useState,useEffect } from "react";

export default function ExpenseTracker() {
  const formRef = useRef();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses data from Firebase Realtime Database
    fetch("https://authanticate-form-default-rtdb.firebaseio.com/user/expenses.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch expenses data");
        }
      })
      .then((data) => {
        // console.log(data);
     //Update the data using setAmount and setDescription
     const fetchedExpenses = [];
        for (const key in data) {
          fetchedExpenses.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category
          });
        }
        setExpenses(fetchedExpenses);
        console.log(fetchedExpenses[0].amount);
        // setAmount(fetchedExpenses[0].amount)
        // setDescription(fetchedExpenses[0].description);
        // setCategory(fetchedExpenses[0].category)
      })
      .catch((error) => {
        console.log("Error occurred while fetching expenses data:", error);
      });
  }, []);


  const submitHandler = (event) => {
    event.preventDefault();
    const amountInput = formRef.current.elements.amount.value;
    const descriptionInput = formRef.current.elements.description.value;
    const categoryInput = formRef.current.elements.category.value;
    console.log(amountInput, descriptionInput, categoryInput);
    setAmount(amountInput);
    setDescription(descriptionInput);
    setCategory(categoryInput);

    const expenseData = {
      amount: amountInput,
      description: descriptionInput,
      category: categoryInput
    };

    fetch(
      "https://authanticate-form-default-rtdb.firebaseio.com/user/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Expense data saved successfully!");
          // Perform any additional actions upon successful save
        } else {
          console.log("Failed to save expense data");
          // Handle the error case
        }
      })
      .catch((error) => {
        console.log("Error occurred while saving expense data:", error);
        // Handle the error case
      });

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
        {expenses.map((expense) => (
          <li key={expense.id} className="bg-white shadow-md rounded p-4 mb-4">
            <span className="font-medium">Amount: </span>
            {expense.amount} |{" "}
            <span className="font-medium">Description: </span>
            {expense.description} |{" "}
            <span className="font-medium">Category: </span>
            {expense.category}
          </li>
        ))}
      </ul>
    </>
  );
}
