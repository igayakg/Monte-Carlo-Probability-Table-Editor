let computedValue = 0;
let previousRangeEnd = 0;

document.addEventListener("DOMContentLoaded", function () {
    const btnAdd = document.querySelector(".js-add-button");
    const btnDel = document.querySelector(".js-delete-button");
    const btnEdit = document.querySelector(".js-edit-button");
    const headerlabel1 = document.getElementById("label1");
    const headerlabel2 = document.getElementById("label2");

    btnAdd.onclick = function () {
        const table1 = document.getElementById("table1").getElementsByTagName("tbody")[0];
        if (table1) {
            const newRow = table1.insertRow();

            for (let i = 0; i < 3; i++) {
                const cell = newRow.insertCell(i);
                cell.contentEditable = "true";
                cell.textContent = "Click to Edit";
                cell.onclick = function () {
                    if (cell.textContent === "Click to Edit") {
                        cell.textContent = "";
                    }
                };
            }
            const cumProbCell = newRow.insertCell(3);
            cumProbCell.textContent = "0.00";
            const rangeCell = newRow.insertCell(4);
            rangeCell.textContent = "0 to 0";

            const probCell = newRow.cells[2];
            probCell.addEventListener("input", function () {
                updateTable(table1);
            });
        } else {
            console.error("Table body not found.");
        }
    };

    btnDel.onclick = function () {
        const table1 = document.getElementById("table1").getElementsByTagName("tbody")[0];
        if (table1 && table1.rows.length > 0) {
            table1.deleteRow(table1.rows.length - 1);
            updateTable(table1);
        } else {
            console.error("Table body is empty or not found.");
        }
    };

    btnEdit.onclick = function () {
        [headerlabel1, headerlabel2].forEach((label) => {
            label.contentEditable = "true";
            label.textContent = "Click to Edit";
            label.onclick = function () {
                if (label.textContent === "Click to Edit") {
                    label.textContent = "";
                }
            };
        });
    };

    function updateTable(table1) {
        computedValue = 0;
        previousRangeEnd = 0;

        for (let row of table1.rows) {
            const probCell = row.cells[2];
            const cumProbCell = row.cells[3];
            const rangeCell = row.cells[4];

            let prob = parseFloat(probCell.textContent) || 0;

            if (Number.isInteger(prob) && prob >= 0 && prob <= 100) {
                prob /= 100;
            } else {
                cumProbCell.textContent = computedValue.toFixed(2);
            }

            computedValue += prob;
            cumProbCell.textContent = computedValue.toFixed(2);

            const rangeStart = previousRangeEnd;
            const rangeEnd = (computedValue * 100) - 1;
            rangeCell.textContent = `${rangeStart.toFixed(0)} to ${rangeEnd.toFixed(0)}`;

            previousRangeEnd = rangeEnd + 1;
        }
    }
});
