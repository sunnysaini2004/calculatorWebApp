// ✅ Display input
let inputDisplay = document.querySelector("#inputDisplay");

// ✅ All buttons
let buttons = document.querySelectorAll(".calBtn");

// ✅ Specific buttons
let clearBtn = document.querySelector(".clearBtn button");
let deleteBtn = document.querySelector(".xBtn button");
let equalBtn = document.querySelector(".equalBtn button");

// ✅ Function to calculate expression (BODMAS style)
function calculateExpression(expr) {
    let tokens = expr.match(/\d+|\+|\-|\*|\//g); // split into numbers & operators
    if (!tokens) return ""; // prevent error if input is empty

    // Step 1: handle * and /
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === "*" || tokens[i] === "/") {
            let left = Number(tokens[i - 1]);
            let right = Number(tokens[i + 1]);
            let result = tokens[i] === "*" ? left * right : left / right;

            tokens.splice(i - 1, 3, result); // replace [left, op, right] with result
            i--; // step back
        }
    }

    // Step 2: handle + and -
    return tokens.reduce((acc, curr, i, arr) => {
        if (curr === "+") return acc + Number(arr[i + 1]);
        if (curr === "-") return acc - Number(arr[i + 1]);
        return acc; // first number
    }, Number(tokens[0]));
}

// ✅ Validate input field (block alphabets)
inputDisplay.addEventListener("input", () => {
    inputDisplay.value = inputDisplay.value.replace(/[a-zA-Z]/g, "");
});

// ✅ Button clicks
buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        let value = event.target.textContent;

        if (value === "C") {
            inputDisplay.value = "";
        } else if (value !== "=") {
            inputDisplay.value += value;
        }
    });
});
// ✅ Delete/backspace button
deleteBtn.addEventListener("click", (e) => {
    e.preventDefault(); // (optional) in case it's inside a form
    inputDisplay.value = inputDisplay.value.slice(0, -1);
});


// ✅ Equal button (calculate result)
// ✅ Equal button (calculate result)
equalBtn.addEventListener("click", () => {
    try {
        let result = calculateExpression(inputDisplay.value);

        if (isNaN(result) || result === Infinity || result === -Infinity) {
            throw new Error("Invalid operation");
        }

        inputDisplay.value = result;
    } catch {
        alert("Invalid operation! Please check your expression.");
        inputDisplay.value = ""; // clear input if wrong
    }
});
