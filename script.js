// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript is linked correctly!");

    // Get the form element
    const form = document.querySelector("#resume-form");

    if (!form) {
        console.error("Form element not found!");
        return;
    }

    console.log("Form element found:", form);

    // Handle form submission
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log("Form submission intercepted!");

        const fileInput = document.querySelector("#resume-upload");
        const jobDescriptionInput = document.querySelector("#job-desc");
        const templateSelect = document.querySelector("#template");

        // Get form data
        const resumeFile = fileInput.files[0];
        const jobDescription = jobDescriptionInput.value;
        const template = templateSelect.value;

        console.log("Uploaded file:", resumeFile);
        console.log("Job Description:", jobDescription);
        console.log("Selected Template:", template);

        if (!jobDescription || !template) {
            alert("Please provide all required inputs.");
            return;
        }

        // Prepare JSON payload
        const payload = {
            name: "Sample Name", // Replace this with actual data input fields if necessary
            address: "Sample Address",
            phone: "Sample Phone",
            email: "sample@example.com",
            areasOfExpertise: "Sample Areas of Expertise",
            experience: [
                {
                    title: "Sample Title",
                    company: "Sample Company",
                    location: "Sample Location",
                    dates: "Sample Dates",
                    details: ["Sample Detail 1", "Sample Detail 2"]
                }
            ]
        };

        try {
            // Make a POST request to the backend
            const response = await fetch("http://127.0.0.1:5000/generate-resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            // Handle the response (PDF download)
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "resume.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            console.log("Resume downloaded successfully.");
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while generating the resume. Please try again.");
        }
    });
});
