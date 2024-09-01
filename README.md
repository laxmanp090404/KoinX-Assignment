
## **Crypto Transaction Tracker Server Side Node.js Application**

This repository contains a **Node.js** application that provides API endpoints for fetching and managing cryptocurrency transactions of users using the **Etherscan API**. The app also fetches the latest Ethereum price at regular intervals using the **CoinGecko API** and stores all data in a **MongoDB** database.

### **Features:**

1. **Fetch User Crypto Transactions**:
   - An API endpoint that fetches "normal" transactions of a user based on their Ethereum address using the Etherscan API.
   - Transactions are stored in a MongoDB database for future retrieval and analysis.

2. **Store Ethereum Price**:
   - A scheduled task that retrieves the current Ethereum price from the CoinGecko API every 10 minutes.
   - Prices are stored in the MongoDB database with timestamps.

3. **Calculate User's Total Expenses**:
   - An API endpoint that calculates the user's total gas expenses from their transactions (using `gasUsed * gasPrice / 1e18`).
   - The API also returns the latest Ethereum price from the database.

### **Tech Stack:**
- **Node.js**: Backend framework
- **Express.js**: Web framework for building the API
- **MongoDB**: NoSQL database to store transactions and Ethereum prices
- **Mongoose**: ORM for MongoDB to handle database operations
- **Axios**: For making HTTP requests to external APIs (Etherscan, CoinGecko)
- **dotenv**: For managing environment variables
- **Etherscan API**: For fetching cryptocurrency transactions
- **CoinGecko API**: For fetching Ethereum price in INR

### **Installation & Setup:**

1. Clone the repository:
   ```bash
   git clone https://github.com/laxmanp090404/KoinX-Assignment.git
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URL =<your-mongodb-url>
   ETHERSCAN_API_KEY=<your-etherscan-api-key>
   SERVER_PORT=5000
   DEV_MODE = "Production"
   ```

4. Start the application:
   ```bash
   npm start
   ```
   or
      ```bash
   npx nodemon Server.js
   ```

### **API Endpoints:**

- **Fetch Transactions**:
  - **GET** `{{baseUrl}}/fetch-transactions/:address`
  - Fetches all normal transactions for the given Ethereum address and stores them in MongoDB.

- **Fetch User Expenses**:
  - **GET** `{{baseUrl}}/expenses/:address`
  - Returns the total gas expenses for a user and the latest Ethereum price.
## Deployed Render Link:
The application is **live** on Render and can be accessed through this [Link](https://koinx-assignment-qgl7.onrender.com/).

### **How to Contribute:**
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

