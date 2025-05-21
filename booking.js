let fetchData = async (data = null) => {
    const url = "http://localhost:3000/bookings";

    try {
        let finalData = data || await (await fetch(url)).json(); // Use provided data or fetch new

        console.log("Data to Display:", finalData); // Debugging output

        let tr_data = document.querySelector("#element");
        tr_data.innerHTML = ""; // Clear previous data

        finalData.forEach(item => {
            const row = document.createElement("tr");

            Object.values(item).forEach(value => {
                let cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            // Edit button
            const editCell = document.createElement("td");
            editCell.innerHTML = `<button onclick="edit(null, '${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
            row.appendChild(editCell);

            // Delete button
            const deleteCell = document.createElement("td");
            deleteCell.innerHTML = `<button onclick="del('${item.id}')"><i class="fa-solid fa-trash"></i></button>`;
            row.appendChild(deleteCell);

            tr_data.appendChild(row);
        });
    } catch (error) {
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



// let search= async()=>{
//     let searchinp=document.querySelector("#ser").value.toLowerCase();
//     let url="http://localhost:3000/bookings";
//     let res =await fetch(url);
//     let data=await res.json();
//      let filterData=data.filter((e)=>{
//         return e.name.toLowerCase().includes(searchinp)||e.age.toString().includes(searchinp)
//      })

//      fetchData(filterData);
//     }




const search = async () => {
    let searchinp = document.querySelector("#ser").value.toLowerCase();
    let url = "http://localhost:3000/bookings";

    try {
        let res = await fetch(url);
        let data = await res.json();

        console.log("Fetched Data:", data);

        let filterData = data.filter(e => {
            let nameMatch = e.name?.toLowerCase().includes(searchinp);
            let ageMatch = e.age?.toString().includes(searchinp);
            return nameMatch || ageMatch;
        });

        console.log("Filtered Data:", filterData); 

        fetchData(filterData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};




let edit = async (data = null, id = null) => {
    document.querySelector("#edit-form").style.display = "flex";
    const url = `http://localhost:3000/bookings/${id}`;

    try {
        let finalData = data || (url ? await (await fetch(url)).json() : null);

        if (!finalData) {
            throw new Error("No data found for editing.");
        }

        console.log("Fetched Booking Data:", finalData);

        // Prefill the form fields
        document.querySelector("#E_carType").value = finalData.carType;
        document.querySelector("#E_name").value = finalData.name;
        document.querySelector("#E_dropoff").value = finalData.dropoff;
        document.querySelector("#E_pickup").value = finalData.pickup;
        document.querySelector("#E_pickupDate").value = finalData.pickupDate;
        document.querySelector("#E_dropoffDate").value = finalData.dropoffDate;

        // Attach event listener for update (ensures only one event attachment)
        document.querySelector("button").onclick = async (event) => {
            event.preventDefault(); 

            const updatedData = {
                carType: document.querySelector("#E_carType").value,
                name: document.querySelector("#E_name").value,
                dropoff: document.querySelector("#E_dropoff").value,
                pickup: document.querySelector("#E_pickup").value,
                pickupDate: document.querySelector("#E_pickupDate").value,
                dropoffDate: document.querySelector("#E_dropoffDate").value,
            };

            try {
                let updateRes = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                });

                if (!updateRes.ok) {
                    throw new Error(`HTTP error! status: ${updateRes.status}`);
                }

                let result = await updateRes.json();
                console.log("Updated Booking:", result);
                alert("Booking updated successfully!");
                fetchData(); // Refresh the table with updated data

            } catch (error) {
                console.error("Error updating booking:", error);
                alert("Failed to update booking.");
            }
        };

    } catch (error) {
        console.error("Error fetching booking details:", error);
        alert("Failed to load booking details.");
    }
};