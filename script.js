document.getElementById("download-resume").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const resumeUrl = "Somesh Pratap Singh Resume.pdf"; // Update with the correct path to your resume
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Somesh_Pratap_Singh_Resume.pdf"; // The downloaded file name
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Simulate a click
    document.body.removeChild(link); // Remove the link after download
});
