import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading }}>
      {children}
    </UserContext.Provider>
  );
};

const UserList = () => {
  const { users, loading } = useContext(UserContext);

  if (loading) return <p className="loading">Loading users...</p>;

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-item">
          <strong>{user.name}</strong> — <em>{user.email}</em>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  return (
    <UserProvider>
      <div className="app">
        <h1 className="title">User List</h1>
        <UserList />
        <style>{`
          body {
            font-family: Arial, sans-serif;
            background: #f7f9fc;
            margin: 0;
            padding: 0;
          }

          .app {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            animation: fadeIn 1s ease-in-out;
          }

          .title {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
            animation: slideDown 0.8s ease-in-out;
          }

          .user-list {
            list-style: none;
            padding: 0;
          }

          .user-item {
            padding: 10px;
            margin-bottom: 8px;
            border-radius: 8px;
            background-color: #eef3ff;
            transition: transform 0.2s ease, background 0.3s;
          }

          .user-item:hover {
            transform: translateY(-3px);
            background-color: #d9e4ff;
          }

          .loading {
            text-align: center;
            color: #555;
            animation: pulse 1.2s infinite;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes pulse {
            0% { opacity: 0.4; }
            50% { opacity: 1; }
            100% { opacity: 0.4; }
          }

          @media (max-width: 600px) {
            .app {
              margin: 20px;
              padding: 15px;
            }

            .title {
              font-size: 1.5rem;
            }

            .user-item {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </div>
    </UserProvider>
  );
};

export default App;
