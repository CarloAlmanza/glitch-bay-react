export const formatphoneNumber = (value, inputType) => {
    let finalValue = value;

    if (inputType === "deleteContentBackward") {
        if (value.endsWith(" ")) {
            finalValue = value.trim();
        }
        if (value === "+3" || value === "+" || value === "+39") {
            return "";
        }
    }

    let numbers = finalValue.replace(/[^\d]/g, "");
    if (numbers.length === 0) {
        return "";
    }

    if (!numbers.startsWith("39")) {
        if (numbers.startsWith("3") && inputType !== "deleteContentBackward") {
            numbers = "39" + numbers;
        } else if (!numbers.startsWith("3")) {
            numbers = "39" + numbers;
        }
    }


    let formatted = "+39";

    if (numbers.length > 2) {
        formatted += " " + numbers.substring(2, 5);
    }
    if (numbers.length > 5) {
        formatted += " " + numbers.substring(5, 12);
    }

    return formatted;
};