import Snackbar from "node-snackbar";

class Form {

    constructor(budget) {
        this.inputTitle = "";
        this.inputAmount = "";

        this.budget = budget;
    }


    validate(message = "") {

        let isValid = this.inputTitle.value !== "" && this.inputAmount.value !== "";

        if(! isValid) {
            message = "Veuillez remplir le formulaire svp"
            Snackbar.show({text: message});
        }
        return isValid;
    }
}

export default Form;