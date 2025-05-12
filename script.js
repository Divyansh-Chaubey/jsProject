const CarPrice = {
    SUV: 6000,
    Sedan: 4000,
    Hatchback: 3000,
    Luxury: 12000,
    Convertible: 10000,
    Electric: 5000,
    Hybrid: 5500,
    Van: 7000,
    Pickup: 6500,
    Traveler: 8000
};


let booking = async () => {
  try {
    let carType = document.querySelector("#carType").value;
    let name = document.querySelector("#name").value;
    let pickupLocation = document.querySelector("#pickup").value;
    let dropoffLocation = document.querySelector("#dropoff").value;
    let pickupDate = document.querySelector("#pickupDate").value;
    let dropoffDate = document.querySelector("#dropoffDate").value;


    // calculate number of days
    const d1 = new Date(pickupDate);
    const d2 = new Date(dropoffDate);
    const diffInMs = d2 - d1;
    const days = diffInMs / (1000 * 60 * 60 * 24);

    if (isNaN(days) || days <= 0) {
      alert("Please enter valid pickup and dropoff dates.");
      return;
    }

    const price = days * CarPrice[carType];

    // booking object
    let bookingData = {
      carType,
      name,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      price
    };

    // send POST request
    const url = "http://localhost:3000/bookings";
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    alert("Booking successful!");
  } 
  catch (error) {
    console.error("Error:", error.message);
    alert(`Error: ${error.message}`);
  }
};
