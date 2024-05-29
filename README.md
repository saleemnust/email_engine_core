# Email Engine Core

## Running the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/saleemnust/email_engine_core.git
   cd email_engine_core
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   CLIENT_ID=outlook_client_id
   CLIENT_SECRET=outlook_client_secret
   REDIRECT_URI=redirect_uri
   ```

3. Start the application using Docker:
   ```sh
   docker-compose up
   ```

4. Access the application:
    - Add Account: `http://localhost:3000/add-account`
    - Email Data: `http://localhost:3000/data`
