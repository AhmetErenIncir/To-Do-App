This project is a client-side "To-Do List" web application built purely with HTML, CSS, and vanilla JavaScript. It allows users to manage their tasks effectively through a clean and user-friendly interface.
Core Features:
User Authentication:
Signup: New users can create an account by providing a username and password. Basic password validation rules (minimum length, character types) are enforced.
Login: Registered users can log in to access their personalized to-do lists.
Client-Side Hashing: For enhanced security over plain text storage, passwords entered during signup and login are hashed on the client-side using the SHA-256 algorithm (via the SubtleCrypto API) before being stored or compared in localStorage. (Note: While an improvement over plain text, this is not a substitute for robust server-side hashing and security practices for production applications).
Task Management:
Add Tasks: Logged-in users can add new tasks to their list.
View Tasks: Tasks are displayed in a clear list format.
Mark as Done: Users can toggle the completion status of each task by clicking on it. Completed tasks are visually distinguished (e.g., strikethrough).
Remove Tasks: Individual tasks can be deleted from the list.
Enter Key Submission: New tasks can be added by pressing the "Enter" key in the input field.
Data Persistence:
User accounts and their respective to-do lists are stored locally in the browser's localStorage. Each user's tasks are stored under a unique key associated with their username, ensuring that tasks are private to each user on the same browser.
User Session Management:
A currentUser item in localStorage tracks the logged-in user.
Access to the to-do list page (index.html) is restricted to logged-in users; others are redirected to the login page.
A "Logout" button allows users to end their session, clearing the currentUser from localStorage and redirecting them to the login page. User tasks remain stored for their next login.
User Interface (UI):
The application features separate pages for login, signup, and the main to-do list.
A clean and intuitive design is implemented using HTML and CSS, with custom styling for input fields, buttons, and task items.
Error messages are displayed to the user for invalid inputs or actions (e.g., incorrect login credentials, existing username during signup).
Technologies Used:
Frontend: HTML5, CSS3, Vanilla JavaScript
Storage: Browser localStorage
Security (Client-Side): SubtleCrypto API for SHA-256 password hashing, DOMPurify for sanitizing user inputs to mitigate XSS risks on login/signup.
Styling: Custom CSS, Google Fonts (Montserrat).
Project Goals & Potential Future Enhancements (as per Recommendations.xml):
While this project serves as a functional client-side to-do application, future development could focus on:
Enhanced Security: Implementing server-side authentication, robust password hashing (bcrypt/Argon2), CSRF protection, and HTTPS.
Improved Stability: Adding global error handling, offline support via Service Workers, and server-side input validation.
Richer User Experience (UX): Incorporating features like task editing, due dates, priority levels, filtering/sorting, dark mode, and improved accessibility.
This application provides a solid foundation for a personal task management tool, demonstrating key concepts in web development, user authentication (client-side), and local data storage.
