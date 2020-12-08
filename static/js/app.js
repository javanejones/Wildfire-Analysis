const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('nav-links li');
    
    burger.addEventListener('click',()=>{
        //Toggle Nav
        nav.classList.toggle('nav-active');
    
        //Animate links
        navLinks.forEach((link,index) => {
            if(link.style.animation) {
                link.style.animation= '';
            } else {
                link.style.animation = 'navLinkFade 0.5s ease forwards ${index / 7 + 1.5}s';
            }

        });
        //Burger Animation
        burger.classList.toggle('toggle');
    });
    
}

navSlide();

// from data.js
// var tableData = Array.from(data[0].values() );
var tableData0 = data[0]

var tbody = d3.select('tbody');

var tableData = Object.values(tableData0);

// // Evr_D3_Table example 
// tableData = Array.from(tableData.values());
// console.log(tableData)

console.log(tableData);
// Populate table using Arrow

tableData.forEach((fire) => {
    var row = tbody.append('tr');
    Object.entries(fire).forEach(([key,value]) => {
        var cell = row.append('td');
        cell.text(value);
    });
});

/**
 * Sort a HTML Table
 * 
 * @param {HTMLTableElement} table the table to sort
 * @param {number} column the index of the column
 * @param {boolean} asc Determines if the sorting will be in ascending 
 */
function sortTable (table, column, asc =true) {
    const dirModifier = asc ? 1: -1;
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.querySelectorAll("tr"));
    
    //sort each row
    const sortedRows = rows.sort((a,b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1})`).textContent.trim();

        // console.log(aColText);
        // console.log(bColText);
        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });
    console.log(sortedRows);

    // remove all existing TRs from the table
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Re-add the newly sorted rows
    tbody.append(...sortedRows);

    // remember  how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

// sortTable(document.querySelector("table"), 0, false);

// document.querySelectorAll(".table-sortable th").forEach(headerCell => {
//     headerCell.addEventListener("click", () => {
//         const tableElement = headerCell.parentElement.parentElement.parentElement;
//         const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
//         const currentIsAscending = headerCell.classList.contains("th-sort-asc");

//         sortTable(tableElement, headerIndex, !currentIsAscending);
//     });
// });


// create a function to use in search bar
// currently using year 
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("Cali-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[10];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}

