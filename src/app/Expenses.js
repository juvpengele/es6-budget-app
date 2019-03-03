import Form from "./Form";

class Expenses extends Form{
    constructor(budget) {
        super(budget);

        this.inputTitle = document.querySelector("#expense-form-title");
        this.inputAmount = document.querySelector("#expense-form-amount");
        this.form = document.querySelector("#expense-form");
        this.expenseList = document.querySelector("#expense-list");
        this.totalAmount = 0;
        this.id = 0;
        this.expenses = [];

        this.budget = budget;
    }

    init() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            if(this.validate()) {
                this.addExpense();
                this.renderTotal();
                this.clearForm();
            }
        });

        this.expenseList.addEventListener("click", (event) => {
            event.preventDefault();
            let expenseId = event.target.dataset.id;

            if(event.target.classList.contains("update")) {

                this.update(expenseId);
            }
            this.removeInTheDom(event.target, expenseId);
        });
    }

    update(expenseId) {
        let expense = this.expenses.filter(expense => expense.id === parseInt(expenseId))[0];
        this.inputAmount.value = expense.amount;
        this.inputTitle.value = expense.title;
    }

    removeInTheDom(element, expenseId) {

        let elementList = element.parentElement.parentElement.parentElement.parentElement;
        this.expenseList.removeChild(elementList);

        this.expenses = this.expenses.filter((expense) => expense.id !== parseInt(expenseId));

        this.renderTotal();

    }


    addExpense() {
        let expense = {
            title: this.inputTitle.value,
            amount: parseInt(this.inputAmount.value),
            id: this.id++
        };
        this.expenses.push(expense);
        this.renderList(expense);
    }

    clearForm() {
        this.inputTitle.value ="";
        this.inputAmount.value = "";
    }

    renderTotal() {
        this.totalAmount = 0;
        this.expenses.forEach((expense) => {
            this.totalAmount += parseInt(expense.amount);
        });
        document.querySelector("#totalExpense").textContent = this.totalAmount;

        this.budget.update();
    }

    renderList(expense) {
        let expenseListItem = document.createElement("li");

        expenseListItem.className = "list-group-item flex-column align-items-start";

        expenseListItem.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${expense.title}</h5>
                <span>
                    <a href="#" class="text-primary expense-icon budget--icon ">
                        <i class="fa fa-pencil update" data-id="${expense.id}"></i>
                    </a>
                    <a href="#" class="text-danger expense-icon budget--icon delete">
                        <i class="fa fa-trash-o delete" data-id="${expense.id}"></i>
                    </a>
                </span>
            </div>
            <span>${expense.amount} FCFA</span>
        `;

        this.expenseList.appendChild(expenseListItem);
    }

}

export default Expenses;