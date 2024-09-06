// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Get the "Get Started" button by its ID
    const getStartedButton = document.getElementById("get-started");

    // Add an event listener for the click event
    getStartedButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default action

        // Redirect to the selection page
        window.location.href = "select-option.html";
    });
});
