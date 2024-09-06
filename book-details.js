// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Parse the URL parameters to get the book ID
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");

    // Simulated book data for demonstration purposes
    const books = [
        {
            id: "1",
            title: "Book Title 1",
            author: "Author 1",
            cover: "book-cover1.jpg",
            description: "This is a description of Book 1.",
            genre: "Fiction",
            price: "$10.00"
        },
        {
            id: "2",
            title: "Book Title 2",
            author: "Author 2",
            cover: "book-cover2.jpg",
            description: "This is a description of Book 2.",
            genre: "Non-fiction",
            price: "$15.00"
        }
        // Add more books as needed
    ];

    // Find the book by ID
    const book = books.find(b => b.id === bookId);

    // Update the HTML elements with the book details
    if (book) {
        document.getElementById("book-title").textContent = book.title;
        document.getElementById("book-author").textContent = book.author;
        document.getElementById("book-cover").src = book.cover;
        document.getElementById("book-description").textContent = book.description;
        document.getElementById("book-genre").textContent = `Genre: ${book.genre}`;
        document.getElementById("book-price").textContent = `Price: ${book.price}`;
    } else {
        // If no book found, show an error message
        document.querySelector(".book-details").innerHTML = "<p>Book not found.</p>";
    }
});
