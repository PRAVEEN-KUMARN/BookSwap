document.addEventListener("DOMContentLoaded", () => {
    // Simulated user data
    const user = {
        username: "John Doe",
        email: "john.doe@example.com",
        location: "New York, USA",
        profilePicture: "placeholder-profile.png",
        books: [
            { id: 1, title: "Book Title 1", author: "Author 1", cover: "book-cover1.jpg" },
            { id: 2, title: "Book Title 2", author: "Author 2", cover: "book-cover2.jpg" }
        ],
        activities: [
            "Swapped 'Book Title 1' with Jane Smith.",
            "Added 'Book Title 2' to their collection.",
            "Updated profile information."
        ]
    };

    // Populate user details
    document.getElementById("username").textContent = user.username;
    document.getElementById("email").textContent = `Email: ${user.email}`;
    document.getElementById("location").textContent = `Location: ${user.location}`;
    document.getElementById("profile-picture").src = user.profilePicture;

    // Populate books
    const bookGrid = document.querySelector(".book-grid");
    user.books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
        `;
        bookGrid.appendChild(bookCard);
    });

    // Populate activities
    const activityList = document.getElementById("activity-list");
    user.activities.forEach(activity => {
        const listItem = document.createElement("li");
        listItem.textContent = activity;
        activityList.appendChild(listItem);
    });

    // Add event listeners for buttons
    document.getElementById("edit-profile").addEventListener("click", () => {
        alert("Edit profile functionality coming soon!");
    });

    document.getElementById("change-password").addEventListener("click", () => {
        alert("Change password functionality coming soon!");
    });

    document.getElementById("logout").addEventListener("click", () => {
        alert("You have been logged out.");
        window.location.href = "index.html"; // Redirect to homepage after logout
    });
});
