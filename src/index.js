import Earnings from "./app/Earnings";
import Expenses from "./app/Expenses";
import Budget from "./app/Budget";

let budget = new Budget();

const earnings = new Earnings(budget);
earnings.init();

const expenses = new Expenses(budget);
expenses.init();