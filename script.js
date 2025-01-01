document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript is linked correctly!");

    const form = document.querySelector("#resume-form");
    if (form) {
        console.log("Form element found:", form);

        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the form from refreshing the page
            console.log("Form submission intercepted!");

            // Collecting form data from the form inputs dynamically
            const name = document.querySelector("#name").value || "Name Not Provided";
            const address = document.querySelector("#address").value || "Address Not Provided";
            const phone = document.querySelector("#phone").value || "Phone Not Provided";
            const email = document.querySelector("#email").value || "Email Not Provided";
            const areasOfExpertise = document.querySelector("#expertise").value || "No expertise listed.";
            const experience = JSON.parse(document.querySelector("#experience").value || "[]");

            const formData = {
                name,
                address,
                phone,
                email,
                areasOfExpertise,
                experience,
            };

            console.log("Form Data Preview:", formData);

            // Send POST request to backend
            fetch("https://ai-res-b.onrender.com/generate-resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok " + response.statusText);
                    }
                    return response.blob();
                })
                .then((blob) => {
                    // Create download link
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.style.display = "none";
                    a.href = url;
                    a.download = "resume.pdf";
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch((error) => console.error("Error:", error));
        });
    } else {
        console.error("Form not found on the page!");
    }
});
