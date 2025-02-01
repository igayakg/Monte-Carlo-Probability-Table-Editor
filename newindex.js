let computedValue = 0;
let previousRangeEnd = 0;
let table1;
let day = 1;
let randomNum = generateRandomNumber();
let result;

document.addEventListener("DOMContentLoaded", function () {
    table1 = document.getElementById("table1").getElementsByTagName("tbody")[0];
    const tableHead = document.getElementById("table1").getElementsByTagName("thead")[0];
    const detail = document.getElementById("detail");
    const btnAdd = document.querySelector(".js-add-button"); 
    const btnSimulate = document.querySelector(".js-simulate-button");

    // Hide the detail header initially
    const detailHeader = tableHead.rows[0].cells[0];
    detailHeader.style.display = "none";

    // Detail checkbox change event
    detail.onchange = function () {
        if (detail.checked) {
            detailHeader.style.display = "table-cell";
            for (let row of table1.rows) {
                const detailCell = row.cells[0];
                detailCell.style.display = "table-cell";
            }
        } else {
            detailHeader.style.display = "none";
            for (let row of table1.rows) {
                const detailCell = row.cells[0];
                detailCell.style.display = "none";
            }
        }       
    };

    btnAdd.addEventListener("click", function () {
        generateRow();
    });

    btnSimulate.addEventListener("click", function () {
        simulate();
    });
    
});

function simulate() {
    result = 
    (() => {
        const rangeCells = document.querySelectorAll(".js-body")[1].querySelectorAll(".rangeCell");
        for (let i = 0; i < rangeCells.length; i++) {
            const rangeText = rangeCells[i].textContent;
            const [rangeStart, rangeEnd] = rangeText.split(" to ").map(Number);
            if (randomNum >= rangeStart && randomNum <= rangeEnd) {
                return document.querySelectorAll(".js-body")[0].rows[i].cells[2].textContent;
            }
        }
        return null;
    })();

    let boilerplateTable3 = `
        <tr>
            <td> ${day++}</td>
            <td> ${randomNum} </td>
            <td> ${result} </td>
        </tr>
    `;
    document.querySelectorAll(".js-body")[2].insertAdjacentHTML('beforeend', boilerplateTable3);

    randomNum = generateRandomNumber();
    console.log(randomNumber);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 101);
}

function generateRow() {
    let boilerplateTable1 = `
        <tr>
            <td contenteditable="true" class="editable-label"> Enter Label </td>
            <td contenteditable="true" class="editable-value rateFactorCell"> Enter Value </td>
            <td contenteditable="true" class="editable-value"> Enter Value </td>
            <td><button class="js-delete-row">X</button></td>
        </tr>
    `;

    let boilerplateTable2 = `
        <tr>
            <td class="probCell"> 0.0 </td>
            <td class="cumProbCell"> 0.0 </td>
            <td class="rangeCell"> 0 to 0 </td>
        </tr>
    `;

    // For appending rows to the table
    document.querySelector(".js-body").insertAdjacentHTML('beforeend', boilerplateTable1);
    document.querySelectorAll(".js-body")[1].insertAdjacentHTML('beforeend', boilerplateTable2);

    // For deleting rows
    document.querySelectorAll('.js-delete-row').forEach((button, index) => {
        button.addEventListener('click', function () {
            const rowIndex = Array.from(button.closest('tbody').children).indexOf(button.closest('tr'));
            this.closest('tr').remove();
            document.querySelectorAll(".js-body")[1].children[rowIndex].remove();
            updateTable();
        });
    });

    // Hide or show the detail column based on the detail checkbox state
    const detail = document.getElementById("detail"); // this is the tickbox
    const newRow = document.querySelector(".js-body").lastElementChild;
    const detailCell = newRow.cells[0];
    if (!detail.checked) {
        detailCell.style.display = "none";
    } else {
        detailCell.style.display = "table-cell";
    }

    // For consistent prompt of each editable cell
    document.querySelectorAll('.editable-label').forEach(cell => {
        cell.addEventListener('focus', function () {
            if (this.innerText === 'Enter Label') this.innerText = '';
        });
        cell.addEventListener('blur', function () {
            if (this.innerText.trim() === '') this.innerText = 'Enter Label';
            updateTable();
        });
    });
    document.querySelectorAll('.editable-value').forEach(cell => {
        cell.addEventListener('focus', function () {
            if (this.innerText === 'Enter Value') this.innerText = '';
        });
        cell.addEventListener('blur', function () {
            if (this.innerText.trim() === '') this.innerText = 'Enter Value';
            updateTable();
        });
    });

    function updateTable() {
        const table1Body = document.querySelectorAll(".js-body")[0];
        const table2Body = document.querySelectorAll(".js-body")[1];
        let totalRateFactor = 0;
    
        // Calculate the total rate factor
        for (let row of table1Body.rows) {
            const rateFactorCell = row.querySelector('.rateFactorCell');
            const rateFactor = parseFloat(rateFactorCell.textContent) || 0;
            totalRateFactor += rateFactor;
        }
    
        computedValue = 0;
        previousRangeEnd = 0;
    
        // Update each probability cell based on the rate factor
        for (let i = 0; i < table1Body.rows.length; i++) {
            const rateFactorCell = table1Body.rows[i].querySelector('.rateFactorCell');
            const probCell = table2Body.rows[i].querySelector('.probCell');
            const cumProbCell = table2Body.rows[i].querySelector('.cumProbCell');
            const rangeCell = table2Body.rows[i].querySelector('.rangeCell');
            const rateFactor = parseFloat(rateFactorCell.textContent) || 0;
            const probability = totalRateFactor ? (rateFactor / totalRateFactor) : 0;
    
            probCell.textContent = probability.toFixed(4);
    
            // Update cumulative probability and range cells
            computedValue += probability;
            cumProbCell.textContent = computedValue.toFixed(4);
    
            const rangeStart = previousRangeEnd;
            const rangeEnd = (computedValue * 100) - 1;
            rangeCell.textContent = `${rangeStart.toFixed(0)} to ${rangeEnd.toFixed(0)}`;
    
            previousRangeEnd = rangeEnd + 1;
        }
    }
}