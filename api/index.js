const express = require("express");
const app = express();
const sendEmail = require("./email");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/send-email", async (req, res) => {
  const { email, subject, message, name } = req.body;
  const html = `
    <h3>Message from ${name}</h3>
    <h3>Email: ${email}</h3>
    <p>${message}</p>
    `;
  try {
    await sendEmail(subject, message, html);
    res
      .status(200)
      .json({ message: "Email sent successfully", status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error", status: "fail" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
