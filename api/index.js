const express = require("express");
const app = express();
const sendEmail = require("./email");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/send-email", (req, res) => {
  const { email, subject, message, name } = req.body;
  const html = `
    <h1>Message from ${name}</h1>
    <h3>Email: ${email}</h3>
    <p>${message}</p>
    `;
  sendEmail(subject, message, html);
  res.send("Email sent successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
