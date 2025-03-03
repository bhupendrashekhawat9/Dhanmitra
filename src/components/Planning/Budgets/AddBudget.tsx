import React, { useState } from 'react';
import './style.css'; // You would create this CSS file with the styles from the HTML version
import { ContextType, useContextv2 } from '../../../Context';
import { addData } from '../../../indexDB/database';

const BudgetManagement = ({handleClose}) => {
    const {store,methods,refreshContextStore} = useContextv2() as ContextType
  const [budget, setBudget] = useState({
    name: "",
    amount: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
    categories: [
      { id: "1", name: "Groceries", amount: "1500", amountType: "AMOUNT" },
      { id: "2", name: "Entertainment", amount: "20", amountType: "PERCENTAGE" },
      { id: "3", name: "Transportation", amount: "700", amountType: "AMOUNT" },
    ],
  });

  // Handle main budget fields change
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setBudget((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category field changes
  const handleCategoryChange = (id, field, value) => {
    setBudget((prev) => ({
      ...prev,
      categories: prev.categories.map((category) =>
        category.id === id ? { ...category, [field]: value } : category
      ),
    }));
  };

  // Toggle between amount and percentage
  const toggleAmountType = (id) => {
    setBudget((prev) => ({
      ...prev,
      categories: prev.categories.map((category) =>
        category.id === id 
          ? { 
              ...category, 
              amountType: category.amountType === "AMOUNT" ? "PERCENTAGE" : "AMOUNT" 
            } 
          : category
      ),
    }));
  };

  // Add a new category
  const handleAddCategory = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    setBudget((prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        { id: newId, name: "", amount: "", amountType: "AMOUNT" },
      ],
    }));
  };

  // Delete a category
  const handleDeleteCategory = (id) => {
    setBudget((prev) => ({
      ...prev,
      categories: prev.categories.filter((category) => category.id !== id),
    }));
  };

  // Calculate total allocated amount
  const calculateTotalAllocated = () => {
    return budget.categories.reduce((total, category) => {
      if (category.amountType === "AMOUNT") {
        return total + (parseFloat(category.amount) || 0);
      } else {
        // If percentage, calculate based on total budget amount
        const budgetAmount = parseFloat(budget.amount) || 0;
        const percentage = parseFloat(category.amount) || 0;
        return total + (budgetAmount * percentage / 100);
      }
    }, 0);
  };

  const totalAllocated = calculateTotalAllocated();
  const budgetAmount = parseFloat(budget.amount) || 0;
  const isExceeding = totalAllocated > budgetAmount && budgetAmount > 0;


    const handleSubmit = async ()=>{
      
    await addData(budget,"budgets")
    methods.fetchAllBudgets()
    handleClose()
}


  return (

        <div className="form-content ">
          <div className="form-content-header">
            <h1 className="page-title">Create New Budget</h1>
          </div>
          
          <div>
            
              <div className="form-control">
                <label className="form-label">Budget Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  name="name"
                  value={budget.name}
                  onChange={handleOnChange}
                  placeholder="e.g., Monthly Expenses"
                />
              </div>
              
              <div className="form-control">
                <label className="form-label">Total Amount</label>
                <input 
                  type="text" 
                  className="form-input" 
                  name="amount"
                  value={budget.amount}
                  onChange={handleOnChange}
                  placeholder="e.g., 5000"
                />
              </div>
              
              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">Valid From</label>
                  <input 
                    type="date" 
                    className="form-input"
                    name="startDate"
                    value={budget.startDate}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-col">
                  <label className="form-label">Valid Till</label>
                  <input 
                    type="date" 
                    className="form-input"
                    name="endDate"
                    value={budget.endDate}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              
              <div className="section-header">
                <div>
                  <h2 className="section-title">Budget Categories</h2>
                  {budget.amount && (
                    <div className={`error-text ${isExceeding ? 'error' : ''}`}>
                      Total allocated: ₹{totalAllocated.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                      {budget.amount && ` / ₹${parseFloat(budget.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </div>
                  )}
                </div>
                <button 
                  type="button" 
                  className="button button-primary button-small"
                  onClick={handleAddCategory}
                >
                  <span className="button-icon">+</span>
                  <span>Add Category</span>
                </button>
              </div>
              
              {budget.categories.map((category) => (
                <div className={`category-item ${isExceeding ? 'error' : ''}`} key={category.id}>
                  <div style={{ flex: 2 }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Category Name" 
                      value={category.name}
                      onChange={(e) => handleCategoryChange(category.id, 'name', e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1, position: "relative" }}>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="Amount" 
                      value={category.amount}
                      onChange={(e) => handleCategoryChange(category.id, 'amount', e.target.value)}
                    />
                    <div style={{ position: "absolute", right: "12px", top: "10px" }}>
                      {category.amountType === "AMOUNT" ? "₹" : "%"}
                    </div>
                  </div>
                  <button 
                    type="button"
                    className="button button-secondary button-small" 
                    style={{ flex: "0 0 auto" }}
                    onClick={() => toggleAmountType(category.id)}
                  >
                    <span>{category.amountType === "AMOUNT" ? "%" : "₹"}</span>
                  </button>
                  <button 
                    type="button"
                    className="button button-secondary button-small" 
                    style={{ flex: "0 0 auto", color: "var(--error)" }}
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <span className="button-icon">🗑️</span>
                  </button>
                </div>
              ))}
              
              <div className="form-actions">
                <button type="button" className="button button-secondary">
                  Cancel
                </button>
                <button onClick={handleSubmit} type="submit" className="button button-primary">
                  Save Budget
                </button>
              </div>
           
          </div>
        </div>
    

  );
};

export default BudgetManagement;