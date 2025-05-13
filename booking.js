let fetchData = async () => {
    const url = "http://localhost:3000/bookings";

    try {
        // Fetch data from the server
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Parse the JSON response
        let data = await res.json();
        console.log(data);

        // Select the table body element
        let tr_data = document.querySelector("#element");
        tr_data.innerHTML = ""; // Clear existing rows

        // Populate the table with data
        data.forEach(item => {
            const row = document.createElement("tr");

            // Add table cells for each value in the item
            Object.values(item).forEach(value => {
                let cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });
            
            // Add edit button
            const editCell = document.createElement("td");
            editCell.innerHTML = `<button onclick="edit('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
            row.appendChild(editCell);

            // Add delete button
            const deleteCell = document.createElement("td");
            deleteCell.innerHTML = `<button onclick="del('${item.id}')"><i class="fa-solid fa-trash"></i></button>`;
            row.appendChild(deleteCell);


            // Append the row to the table body
            tr_data.appendChild(row);
        });
    } catch (error) {
        // Log and display errors
        console.error("Error fetching data:", error);
        alert("Failed to fetch booking data. Please try again later.");
    }
};

// let del = async (id) => {
//     const url = `http://localhost:3000/bookings/${id}`;

//     try {
//         // Confirm deletion with the user
//         const confirmDelete = confirm("Are you sure you want to delete this booking?");
//         if (!confirmDelete) return;

//         // Send DELETE request to the server
//         let res = await fetch(url, { method: "DELETE" });
//         if (!res.ok) {
//             throw new Error(`Failed to delete booking with ID ${id}. HTTP status: ${res.status}`);
//         }

//         // Notify the user and refresh the table
//         alert("Booking deleted successfully!");
//         fetchData(); // Refresh the table
//     } catch (error) {
//         // Log and display errors
//         console.error("Error deleting booking:", error);
//         alert("An error occurred while deleting the booking. Please try again.");
//     }
// };





let del=async(id)=>{
const url = `http://localhost:3000/bookings/${id}`;
await fetch(url,{method:"DELETE"})
fetchData();
}



let search= async()=>{
    let searchinp=document.querySelector("#ser").value.toLowerCase();
    let url="http://localhost:3000/bookings";
    let res =await fetch(url);
    let data=await res.json();
     let filterData=data.filter((e)=>{
        return e.name.toLowerCase().includes(searchinp)||e.age.toString().includes(searchinp)
     })

     fetchData(filterData);
    }
