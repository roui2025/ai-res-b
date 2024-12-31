console.log("JavaScript is linked correctly!");

// Select the form element
const form = document.getElementById("resume-form");

if (form) {
    console.log("Form element found:", form);

    // Add the submit event listener
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        console.log("Form submission intercepted!");

        // Get the uploaded file
        const fileInput = document.getElementById("resume-upload");
        const resumeFile = fileInput.files[0];
        if (resumeFile) {
            console.log("Uploaded file:", resumeFile.name, resumeFile.type, resumeFile.size);
        } else {
            console.log("No file uploaded.");
        }

        // Get the job description
        const jobDescription = document.getElementById("job-desc").value;
        console.log("Job Description:", jobDescription);

        // Get the selected template
        const template = document.getElementById("template").value;
        console.log("Selected Template:", template);

        // Validate inputs
        if (!resumeFile || !jobDescription || !template) {
            alert("Please fill out all fields!");
            return;
        }

        // Display data on the page
        const previewDiv = document.getElementById("preview");
        previewDiv.innerHTML = `
            <h3>Form Data Preview:</h3>
            <p><strong>Uploaded File:</strong> ${resumeFile ? resumeFile.name : "No file uploaded"}</p>
            <p><strong>Job Description:</strong> ${jobDescription}</p>
            <p><strong>Selected Template:</strong> ${template}</p>
        `;

        // Simulate AI processing or send data to the back end
        fetch("https://your-backend-url.com/process", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobDescription, template })
        })
        .then(response => response.json())
        .then(data => {
            console.log("AI Response:", data);
            // Display AI response on the page
            previewDiv.innerHTML += `<p><strong>AI Suggestions:</strong> ${data.suggestions}</p>`;
        })
        .catch(error => {
            console.error("Error:", error);
            previewDiv.innerHTML += `<p><strong>Error:</strong> Unable to retrieve AI suggestions.</p>`;
        });
    });
} else {
    console.error("Form element not found!");
}
