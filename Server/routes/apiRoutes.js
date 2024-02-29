// const express = require("express");
// const cors = require('cors');
// const router = express.Router();
// const userRouter = require("./userRouter");

// // Use the userRouter for handling requests to the /user endpoint
// app.use("/", userRouter);
// app.use(cors());
// router.get("./user",(req,res) =>{
//     const user = req.user;
//     const userData = JSON.parse(localStorage.getItem('user'));
//     if (!userData || !userData[user._id]) {
//         res.status(404).json({
//           message: "User does not exist",
//         });
//         return;
//       }
//       const userDetail = userData[user._id];
//       if (userDetail.type === "recruiter") {
//         res.json({
//           type: "recruiter",
//         });
//       } else {
//         res.json({
//           type: "applicant",
//         });
//       }
// })
// router.post("/user/register", (req, res) => {
//     const { email, userData } = req.body;

//     // Check if email and user data are provided
//     if (!email || !userData) {
//         return res.status(400).json({ error: 'Email and user data are required' });
//     }

//     // Check if the email is already registered
//     if (users.some(user => user.email === email)) {
//         return res.status(400).json({ error: 'Email is already registered' });
//     }

//     // Add the new user to the users array
//     users.push({ email, userData });

//     // You may want to perform additional validation or processing here

//     // Send a success response
//     res.json({ message: 'User registered successfully' });
// });
// module.exports = router;
