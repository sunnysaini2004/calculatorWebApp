let input = document.querySelector("#inputBox");
let buttons = document.querySelectorAll("button");
let str;

let calculateExpression = () => {
    try {
        // Evaluate safely using Function constructor (better than eval)
        return new Function('return ' + str)();
    } catch (e) {
        return "Error"; // if invalid expression
    }
};

// input validation
input.addEventListener("input", () => {
    input.value = input.value.replace(/[A-Za-z]/g, "");
});

// Event Listener on Buttons
buttons.forEach((button) => {
    button.addEventListener("click", (evt) => {
        let btnValue = evt.target.textContent;

        // 🔥 Fix for mobile tap highlight "sticking"
        setTimeout(() => button.blur(), 100);

        if (btnValue === "DEL") {
            input.value = input.value.slice(0, -1); // assign back ✅
        } else if (btnValue === "AC") {
            input.value = ""; // clear all
        } else if (btnValue === "=") {
            input.value = calculateExpression(); // ✅ call function
        } else {
            input.value += btnValue; // append other buttons
        }

        str = input.value;
    });
});
