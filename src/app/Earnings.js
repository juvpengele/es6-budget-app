import Form from "./Form";

class Earnings extends Form {
    constructor(budget) {
        super(budget);

        this.inputTitle = document.querySelector("#earning-form-title");
        this.inputAmount = document.querySelector("#earning-form-amount");
        this.form = document.querySelector("#earning-form");
        this.earningList = document.querySelector("#earning-list");
        this.totalAmount = 0;
        this.id = 0;
        this.earnings = [];

        this.budget = budget;
    }


    init() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            if(this.validate()) {
                this.addEarning();
                this.renderTotal();
                this.clearForm();
            }

        });
        this.earningList.addEventListener("click", (event) => {
            event.preventDefault();
            let earningId = event.target.dataset.id;
            if(event.target.classList.contains("update")) {
                this.update(earningId);
            }
            this.removeInTheDom(event.target, earningId);
        });
    }

    update(earningId) {
        let earning = this.earnings.filter(earning => earning.id === parseInt(earningId))[0];
        this.inputAmount.value = earning.amount;
        this.inputTitle.value = earning.title;
    }


    removeInTheDom(element, earningId) {

        let elementList = element.parentElement.parentElement.parentElement.parentElement;
        this.earningList.removeChild(elementList);

        this.earnings = this.earnings.filter((earning) => earning.id !== parseInt(earningId));

        this.renderTotal();

    }



    addEarning() {
        let earning = {
            title: this.inputTitle.value,
            amount: parseInt(this.inputAmount.value),
            id: this.id++
        };
        this.earnings.push(earning);
        this.renderList(earning);
    }

    clearForm() {
        this.inputTitle.value ="";
        this.inputAmount.value = "";
    }

    renderTotal() {
        this.totalAmount = 0;
        this.earnings.forEach((earning) => {
            this.totalAmount += parseInt(earning.amount);
        });
        document.querySelector("#totalEarning").textContent = this.totalAmount;

        this.budget.update();
    }

    renderList(earning) {
        let earningListItem = document.createElement("li");

        earningListItem.className = "list-group-item flex-column align-items-start";

        earningListItem.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${earning.title}</h5>
                <span>
                    <a href="#" class="text-primary earning-icon budget--icon ">
                        <i class="fa fa-pencil update" data-id="${earning.id}"></i>
                    </a>
                    <a href="#" class="text-danger earning-icon budget--icon delete">
                        <i class="fa fa-trash-o delete" data-id="${earning.id}"></i>
                    </a>
                </span>
            </div>
            <span>${earning.amount} FCFA</span>
        `;

        this.earningList.appendChild(earningListItem);
    }
}

export default Earnings;