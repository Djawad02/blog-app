# Database Setup Instructions

## Prerequisites

- MySQL installed on your machine.
- Basic knowledge of using the terminal or command prompt.

## Importing the Database

Follow these steps to import the database dump:

1. **Download the Dump File**:
   Obtain the `dump.sql` file from the provided source.

2. **Open Terminal or Command Prompt**:

3. **Log in to MySQL**:
   Use the following command to log in to MySQL. You will be prompted to enter your password.

   ```bash
   mysql -u your_username -p
   ```

Replace your_username with your MySQL username.

4. **Create a New Database**:
   Once logged in, create a new database where the data will be imported

```bash
CREATE DATABASE blogapp;
```

5. **Use the Newly Created Database**:

```bash
USE blogapp;
```

6. **Import the SQL Dump File**:
   Now, import the dump file using the following command:

```bash
SOURCE /path/to/your/dump.sql;
```

Replace /path/to/your/data.sql with the actual path to your data.sql file.

7. **Verify the Data**:

```bash
SELECT * FROM your_table_name;
```
