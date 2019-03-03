class Budget {
    constructor() {
        this.budgetTotal = 0;
        this.budgetElement = document.querySelector("#totalBudget");
    }

    update() {
        let totalEarning = document.querySelector("#totalEarning").innerHTML;
        let totalExpense = document.querySelector("#totalExpense").innerHTML;

        this.budgetTotal = parseInt(totalEarning) - parseInt(totalExpense);
        this.render();
    }

    render() {
        this.budgetElement.innerHTML = this.budgetTotal;
        if(this.budgetTotal > 0) {
            this.budgetElement.classList.remove("text-danger", "text-black");
            this.budgetElement.classList.add("text-success");
        } else if (this.budgetTotal === 0) {
            this.budgetElement.classList.remove("text-danger", "text-success");
            this.budgetElement.classList.add("text-black");
        } else {
            this.budgetElement.classList.remove("text-black", "text-success");
            this.budgetElement.classList.add("text-danger");
        }
    }


}

export default Budget;