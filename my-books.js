document.addEventListener("DOMContentLoaded", () => {
    const bookGrid = document.getElementById("book-grid");
    const bookModal = document.getElementById("book-modal");
    const closeModal = document.querySelector(".close");
    const bookForm = document.getElementById("book-form");
    const modalTitle = document.getElementById("modal-title");
    const bookIdInput = document.getElementById("book-id");
    const saveBookButton = document.getElementById("save-book");
    const takePictureButton = document.getElementById("take-picture");
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const capturedImage = document.getElementById("captured-image");

    // Simulated user's book data
    let books = [
        {
            id: 1,
            title: "Book Title 1",
            author: "Author 1",
            cover: "book-cover1.jpg",
            description: "This is a description of Book 1.",
            genre: "Fiction",
            status: "available"
        },
        {
            id: 2,
            title: "Book Title 2",
            author: "Author 2",
            cover: "book-cover2.jpg",
            description: "This is a description of Book 2.",
            genre: "Non-fiction",
            status: "unavailable"
        }
        // Add more books as needed
    ];

    // Function to display books
    function displayBooks() {
        bookGrid.innerHTML = "";
        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.className = "book-card";
            bookCard.innerHTML = `
                <img src="${book.cover}" alt="${book.title}">
                <h2>${book.title}</h2>
                <p>${book.author}</p>
                <p>Status: ${book.status}</p>
                <button onclick="editBook(${book.id})">Edit</button>
                <button onclick="deleteBook(${book.id})">Delete</button>
            `;
            bookGrid.appendChild(bookCard);
        });
    }

    // Function to show the modal
    function showModal() {
        bookModal.style.display = "block";
    }

    // Function to hide the modal
    function hideModal() {
        bookModal.style.display = "none";
        bookForm.reset();
        stopVideo();
        capturedImage.src = '';
        capturedImage.style.display = 'none';
    }

    // Function to start the camera
    function startCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
                video.style.display = "block";
                canvas.style.display = "none";
            });
        } else {
            alert("Camera not supported by your browser.");
        }
    }

    // Function to stop the camera
    function stopVideo() {
        const stream = video.srcObject;
        const tracks = stream ? stream.getTracks() : [];
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        video.style.display = "none";
        canvas.style.display = "none";
    }

    // Function to capture the image
    function captureImage() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageData = canvas.toDataURL('image/png');
        capturedImage.src = imageData;
        capturedImage.style.display = 'block';
        canvas.style.display = 'none';
        video.style.display = 'none';
        stopVideo();
        document.getElementById('cover').value = imageData; // Save image data URL to cover field
    }

    // Function to add or edit a book
    function saveBook(event) {
        event.preventDefault();
        const id = bookIdInput.value;
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const cover = document.getElementById("cover").value || 'default-cover.jpg';
        const description = document.getElementById("description").value;
        const genre = document.getElementById("genre").value;
        const status = document.getElementById("status").value;

        if (id) {
            // Edit existing book
            const book = books.find(book => book.id == id);
            book.title = title;
            book.author = author;
            book.cover = cover;
            book.description = description;
            book.genre = genre;
            book.status = status;
        } else {
            // Add new book
            const newBook = {
                id: books.length ? Math.max(...books.map(book => book.id)) + 1 : 1,
                title: title,
                author: author,
                cover: cover,
                description: description,
                genre: genre,
                status: status
            };
            books.push(newBook);
        }

        displayBooks();
        hideModal();
    }

    // Function to edit a book
    function editBook(id) {
        const book = books.find(book => book.id == id);
        if (book) {
            modalTitle.textContent = "Edit Book";
            bookIdInput.value = book.id;
            document.getElementById("title").value = book.title;
            document.getElementById("author").value = book.author;
            document.getElementById("cover").value = book.cover;
            document.getElementById("description").value = book.description;
            document.getElementById("genre").value = book.genre;
            document.getElementById("status").value = book.status;
            showModal();
        }
    }

    // Function to delete a book
    function deleteBook(id) {
        books = books.filter(book => book.id != id);
        displayBooks();
    }

    // Event listeners
    document.getElementById("add-book").addEventListener("click", () => {
        modalTitle.textContent = "Add Book";
        bookIdInput.value = "";
        showModal();
    });

    closeModal.addEventListener("click", hideModal);
    window.addEventListener("click", event => {
        if (event.target == bookModal) {
            hideModal();
        }
    });

    bookForm.addEventListener("submit", saveBook);
    takePictureButton.addEventListener("click", () => {
        if (video.style.display === "block") {
            captureImage();
        } else {
            startCamera();
        }
    });

    // Initial display of books
    displayBooks();
});

// Make functions accessible for onclick in HTML
window.editBook = editBook;
window.deleteBook = deleteBook;
