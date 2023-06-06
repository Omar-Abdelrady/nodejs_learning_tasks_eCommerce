import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@app.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: true,
  },
  {
    name: "Omar Abdelrady",
    email: "omar@app.com",
    password: bcrypt.hashSync("password", 10),
  },
  {
    name: "Somaia Hassan",
    email: "somaia@app.com",
    password: bcrypt.hashSync("password", 10),
  },
];

export default users;
