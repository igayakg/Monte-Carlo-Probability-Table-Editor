let computedValue = 0;
let previousRangeEnd = 0;
let table1;

document.addEventListener("DOMContentLoaded", function () {
    table1 = document.getElementById("table1").getElementsByTagName("tbody")[0];
    tableHead = document.getElementById("table1").getElementsByTagName("thead")[0];
    wholeTable = document.getElementById("table1");
    const btnAdd = document.querySelector(".js-add-button");
    const btnDel = document.querySelector(".js-delete-button");
    const btnEdit = document.querySelector(".js-edit-button");
    const headerlabel1 = document.getElementById("label1");
    const headerlabel2 = document.getElementById("label2");
    const autoCalculate = document.getElementById("autoCalculate");
    const detail = document.getElementById("detail");
    const rateFactorHeader = tableHead.rows[0].cells[2];
    const detailHeader = tableHead.rows[0].cells[0];

    // Hide the rateFactor(% Factor) and detail header initially
    rateFactorHeader.style.display = "none";
    detailHeader.style.display = "none";

    //////////////////////////////////////
    /* (on DOM Event Listener)
        if autoCalculate is checked, hide the rateFactorCell (% Rate) and make the probCell editable and update other rows,
        if autoCalculated is not checked, show the rateFactor Cell and make the probCell editable and update other rows*/
    //////////////////////////////////////
    autoCalculate.onchange = function () {
        if (autoCalculate.checked) {
            rateFactorHeader.style.display = "table-cell";
            for (let row of table1.rows) {
                const rateFactorCell = row.cells[2];
                const probCell = row.cells[3];
                rateFactorCell.style.display = "table-cell";
                probCell.contentEditable = "false";
                if (probCell.textContent === "Click to Edit") {
                    probCell.textContent = "0.00";
                }
            }
        } else {
            rateFactorHeader.style.display = "none";
            for (let row of table1.rows) {
                const rateFactorCell = row.cells[2];
                const probCell = row.cells[3];
                rateFactorCell.style.display = "none";
                probCell.contentEditable = "true";
                if (probCell.textContent === "0.00") {
                    probCell.textContent = "Click to Edit";
                }
            }
        }
    };
    
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

    btnAdd.onclick = function () {
        const table1 = document.getElementById("table1").getElementsByTagName("tbody")[0];
        if (table1) {
            const newRow = table1.insertRow();

            const detailCell = newRow.insertCell(0);
            detailCell.contentEditable = "true";
            detailCell.textContent = "Click to Edit";

            const observedCountCell = newRow.insertCell(1);
            observedCountCell.contentEditable = "true";
            observedCountCell.textContent = "Click to Edit";

            const rateFactorCell = newRow.insertCell(2);
            rateFactorCell.contentEditable = "true";
            rateFactorCell.textContent = "Click to Edit";

            const probCell = newRow.insertCell(3);
            probCell.contentEditable = "true";
            probCell.textContent = "Click to Edit";

            const cumProbCell = newRow.insertCell(4);
            cumProbCell.textContent = "0.00";

            const rangeCell = newRow.insertCell(5);
            rangeCell.textContent = "0 to 0";

            //////////////////////////////////////
            /* if autoCalculate is checked, generate hidden rateFactorCell (% Rate) and  generate editable probCell
                else if autoCalculated is not checked, generate visible rateFactor Cell and generate editable probCell */
            //////////////////////////////////////

            if (!autoCalculate.checked) {
                rateFactorCell.style.display = "none";
                probCell.contentEditable = "true";
                probCell.textContent = "Click to Edit";
            } else {
                rateFactorCell.style.display = "table-cell";
                probCell.contentEditable = "false";
                probCell.textContent = "0.00";
            }

            for (let row of table1.rows) {
                const rateFactorCell = row.cells[2];
                const probCell = row.cells[3];

                if (!autoCalculate.checked) {
                    rateFactorCell.style.display = "none";
                    probCell.contentEditable = "true";
                    if (probCell.textContent === "0.00") {
                        probCell.textContent = "Click to Edit";
                    }
                } else {
                    rateFactorCell.style.display = "table-cell";
                    probCell.contentEditable = "false";
                    if (probCell.textContent === "Click to Edit") {
                        probCell.textContent = "0.00";
                    }
                }
            }



            //////////////////////////////////////
            /* if detail is checked, show the detail column
                else hide it */
            //////////////////////////////////////

            if (!detail.checked) {
                detailCell.style.display = "none";
            } else {
                detailCell.style.display = "table-cell";
            }



            //////////////////////////////////////
            // Listener for the input event of probCell and rateFactorCell and update table accordingly
            //////////////////////////////////////

            [probCell, rateFactorCell].forEach(cell => {
                cell.addEventListener("input", function () {
                    updateTable(table1);
                });
            });


            
            //////////////////////////////////////
            // Function for setting it back to "Click to Edit" when empty
            //////////////////////////////////////

            [detailCell, observedCountCell, rateFactorCell, probCell].forEach(cell => {
                cell.onclick = function () {
                    if (cell.textContent === "Click to Edit") {
                        cell.textContent = "";
                    }
                };
                cell.onblur = function () {
                    if (cell.textContent.trim() === "") {
                            cell.textContent = "Click to Edit";
                    }
                }
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

        if (autoCalculate.checked) {
            // Function for updating the probability values, cumu prob, and rni when autoCalculate is checked
            updateProbability(table1);
        } else {
            // Codeblock for updating the cumulative and rni values when autoCalculate is unchecked
            computedValue = 0;
            previousRangeEnd = 0;
            for (let row of table1.rows) {
                const probCell = row.cells[3];
                const cumProbCell = row.cells[4];
                const rangeCell = row.cells[5];

                let prob = parseFloat(probCell.textContent) || 0;

                if (Number.isInteger(prob) && prob >= 0 && prob <= 100) {
                    prob /= 100;
                } else {
                    cumProbCell.textContent = computedValue.toFixed(3);
                }

                computedValue += prob;
                cumProbCell.textContent = computedValue.toFixed(4);

                const rangeStart = previousRangeEnd;
                const rangeEnd = (computedValue * 100) - 1;
                rangeCell.textContent = `${rangeStart.toFixed(0)} to ${rangeEnd.toFixed(0)}`;

                previousRangeEnd = rangeEnd + 1;
            }
        }
    }


    // Function for updating the probability values, cumu prob, and rni when autoCalculate is checked
    function updateProbability(table1) {
        let totalRateFactor = 0;
        
        // Calculate the total rate factor
        for (let row of table1.rows) {
            const rateFactorCell = row.cells[2];
            const rateFactor = parseFloat(rateFactorCell.textContent) || 0;
            totalRateFactor += rateFactor;
        }

        computedValue = 0;
        previousRangeEnd = 0;
        // Update each probability cell based on the rate factor
        for (let row of table1.rows) {
            const rateFactorCell = row.cells[2];
            const probCell = row.cells[3];
            const cumProbCell = row.cells[4];
            const rangeCell = row.cells[5];
            const rateFactor = parseFloat(rateFactorCell.textContent) || 0;
            const probability = totalRateFactor ? (rateFactor / totalRateFactor) : 0;

            probCell.textContent = probability.toFixed(4);

            let prob = parseFloat(probCell.textContent) || 0;

            if (Number.isInteger(prob) && prob >= 0 && prob <= 100) {
                prob /= 100;
            } else {
                cumProbCell.textContent = computedValue.toFixed(3);
            }

            computedValue += prob;
            cumProbCell.textContent = computedValue.toFixed(4);

            const rangeStart = previousRangeEnd;
            const rangeEnd = (computedValue * 100) - 1;
            rangeCell.textContent = `${rangeStart.toFixed(0)} to ${rangeEnd.toFixed(0)}`;

            previousRangeEnd = rangeEnd + 1;
        }
    }
});

function generateRandomDataOnBody(){
    console.log("History");
    let html = `
        <tr>
            <td>1</td>
        </tr>
    `;

    
    document.querySelector(".js-body").innerHTML = `${html}`;

}

generateRandomDataOnBody();