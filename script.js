// Select the form element
const form = document.getElementById("resume-form");

// Listen for the form's submit event
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Get the uploaded file
    const fileInput = document.getElementById("resume-upload");
    const resumeFile = fileInput.files[0];

    // Get the job description
    const jobDescription = document.getElementById("job-desc").value;

    // Log the data to the console
    console.log("Resume File:", resumeFile);
    console.log("Job Description:", jobDescription);
});
