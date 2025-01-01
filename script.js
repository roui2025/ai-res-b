document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript is linked correctly!");

    const form = document.querySelector("#resume-form");
    if (form) {
        console.log("Form element found:", form);

        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the form from refreshing the page
            console.log("Form submission intercepted!");

            // Collecting form data
            const formData = {
                name: document.querySelector("#name").value || "John Doe",
                address: document.querySelector("#address").value || "123 Main St",
                phone: document.querySelector("#phone").value || "+1 555-123-4567",
                email: document.querySelector("#email").value || "john.doe@example.com",
                areasOfExpertise: document.querySelector("#expertise").value || "Web Development, APIs",
                experience: [
                    {
                        title: "Software Engineer",
                        company: "TechCorp",
                        location: "San Francisco, CA",
                        dates: "2020–Present",
                        details: ["Developed scalable APIs", "Improved system performance"],
                    },
                ],
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
