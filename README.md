Expense Sharing App
This is a simple full-stack expense sharing application where users can create groups, add shared expenses, and see who owes whom. The goal of this project was to build a clean and functional system similar to basic expense-splitting apps.

Live Links

Frontend: https://expense-splitter-ui-opal.vercel.app/
Backend API: https://expense-sharing-w13r.onrender.com/

What the App Does

Users can be created and reused across multiple groups
Groups are created by selecting existing users
Expenses can be added to a group and are split equally
The app automatically calculates balances
Users can see how much they owe or are owed
Data is stored persistently using MongoDB

Tech Used

Frontend
React (Create React App)
Context API
Plain CSS
Deployed on Vercel

Backend

Node.js
Express.js
MongoDB Atlas
Mongoose
Deployed on Render
How the App Is Structured
Users exist independently of groups
Groups only reference user IDs
Expenses belong to groups
Balances are calculated based on group expenses
Frontend and backend are deployed separately and communicate via REST APIs
Running the Project Locally
Backend
npm install
npm start

Frontend

cd expense-sharing-ui
npm install
npm start
Environment Variables
Backend
MONGO_URI=your_mongodb_connection_string


Frontend
REACT_APP_API_URL=https://expense-sharing-w13r.onrender.com
Notes
The UI is intentionally simple and focused on functionality
Duplicate users during testing can appear if created multiple times
The project was built with correctness and real-world behavior in mind

Author

Harsha Vardhan
Built as part of an internship assignment
