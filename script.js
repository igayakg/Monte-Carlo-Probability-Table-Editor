let computedValue = 0;
let previousRangeEnd = 0;

document.addEventListener("DOMContentLoaded", function () {
    const btnAdd = document.getElementById("btnAdd");
    const btnDel = document.getElementById("btnDel");
    const btnEdit = document.getElementById("btnEdit");
    const headerlabel1 = document.getElementById("label1");
    const headerlabel2 = document.getElementById("label2");

    btnAdd.onclick = function () {
        const table1 = document.getElementById("table1").getElementsByTagName("tbody")[0];
        if (table1) {
            const newRow = table1.insertRow();

            const cel1 = newRow.insertCell(0);
            cel1.contentEditable = "true";
            cel1.textContent = "Click to Edit";
            cel1.onclick = function() {
                if (cel1.textContent === "Click to Edit") {
                    cel1.textContent = "";
                }
            };
            const cel2 = newRow.insertCell(1);
            cel2.contentEditable = "true";
            cel2.textContent = "Click to Edit";
            cel2.onclick = function() {
                if (cel2.textContent === "Click to Edit") {
                    cel2.textContent = "";
                }
            };
            const cel3 = newRow.insertCell(2);
            cel3.contentEditable = "true";
            cel3.textContent = "Click to Edit";
            cel3.onclick = function() {
                if (cel3.textContent === "Click to Edit") {
                    cel3.textContent = "";
                }
            };
            const cel4 = newRow.insertCell(3);
            cel4.textContent = "0.00";

            const cel5 = newRow.insertCell(4);
            cel5.textContent = "0 to 0";

            cel3.addEventListener("input", function () {
                const userProb = parseFloat(cel3.textContent) || 0;

                if (isNaN(userProb) || userProb < 0) {
                    cel3.style.backgroundColor = "#ffdddd";
                    return;
                } else {
                    cel3.style.backgroundColor = "";
                }


                computedValue = 0;
                previousRangeEnd = 0;

                for (let row of table1.rows) {
                    const probCell = row.cells[2];
                    const cumProbCell = row.cells[3];
                    const rangeCell = row.cells[4];

                    const prob = parseFloat(probCell.textContent) || 0;
                    computedValue += prob;

                    cumProbCell.textContent = computedValue.toFixed(2);

                    const rangeStart = previousRangeEnd;
                    const rangeEnd = (computedValue * 100) - 1;
                    rangeCell.textContent = `${rangeStart.toFixed(0)} to ${rangeEnd.toFixed(0)}`;
                    previousRangeEnd = rangeEnd + 1;
                }
            });
        } else {
            console.error("Table body not found.");
        }
    };

    btnDel.onclick = function () {
        const table1 = document.getElementById("table1").getElementsByTagName("tbody")[0];
        if (table1) {
            if (table1.rows.length > 0) {
                table1.deleteRow(table1.rows.length - 1);
                computedValue = 0;
                previousRangeEnd = 0;

                for (let row of table1.rows) {
                    const probCell = row.cells[2];
                    const cumProbCell = row.cells[3];
                    const rangeCell = row.cells[4];

                    const prob = parseFloat(probCell.textContent) || 0;
                    computedValue += prob;

                    cumProbCell.textContent = computedValue.toFixed(2);

                    const rangeStart = previousRangeEnd;
                    const rangeEnd = (computedValue * 100) - 1;
                    rangeCell.textContent = `${rangeStart.toFixed(0)} to ${rangeEnd.toFixed(0)}`;
                    previousRangeEnd = rangeEnd + 1;
                }
            } else {
                console.error("Table body is empty.");
            }
        } else {
            console.error("Table body not found.");
        }
    };

    btnEdit.onclick = function () {
        

        headerlabel1.contentEditable = "true";
            headerlabel1.textContent = "Click to Edit";
            headerlabel1.onclick = function() {
                if (headerlabel1.textContent === "Click to Edit") {
                    headerlabel1.textContent = "";
                }
            };
        
        headerlabel2.contentEditable = "true";
            headerlabel2.textContent = "Click to Edit";
            headerlabel2.onclick = function() {
                if (headerlabel2.textContent === "Click to Edit") {
                    headerlabel2.textContent = "";
                }
            };
    };
});
