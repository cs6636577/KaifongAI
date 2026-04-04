"use client";
function Dashboard(){
    fetch("/api/summary")
    .then(res => {
      console.log("Response raw:", res);
      return res.json();
    })
    .then(data => console.log("Data parsed:", data))
    .catch(err => console.error("Fetch error:", err));

   return (
    <>

    </>
   )
}

export default Dashboard ;