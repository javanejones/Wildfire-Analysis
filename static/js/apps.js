
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
var tableData0 = temp[0]

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


// create a function to use in search bar
// currently using year 
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("Cali-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
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
