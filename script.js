document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript is linked correctly!");

    const form = document.querySelector("#resume-form");
    if (!form) {
        console.error("Form element not found!");
        return;
    }

    console.log("Form element found:", form);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("Form submission intercepted!");

        const resumeFile = document.querySelector("#resume-upload").files[0];
        const jobDescription = document.querySelector("#job-desc").value;
        const template = document.querySelector("#template").value;

        console.log("Uploaded file:", resumeFile);
        console.log("Job Description:", jobDescription);
        console.log("Selected Template:", template);

        const data = {
            name: "John Doe",
            address: "123 Main St, Springfield, USA",
            phone: "+1 555-123-4567",
            email: "john.doe@example.com",
            areasOfExpertise: "Web Development, APIs, JavaScript",
            experience: [
                {
                    title: "Software Engineer",
                    company: "TechCorp",
                    location: "San Francisco, CA",
                    dates: "2020–Present",
                    details: ["Developed scalable APIs", "Improved system performance"]
                }
            ]
        };

        try {
            const response = await fetch("https://your-app.onrender.com/generate-resume", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = "resume.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            console.log("PDF downloaded successfully.");
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
