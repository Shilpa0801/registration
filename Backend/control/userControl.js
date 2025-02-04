const db = require("../model/dbConnect");
const jwt=require('jsonwebtoken')
const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const sql = "INSERT INTO userdata (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send({ msg: "Database error", error: err });
        }
        res.send({ msg: "Registration successful" });
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ msg: "Email and password are required" });
    }
    const sql = "SELECT * FROM userdata WHERE email = ?";

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send({ msg: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(401).send({ msg: "User not found" });
        }

        const user = results[0];
        const token=jwt.sign({data:user},'authen',{expiresIn:'1hr'})
     
        if (user.password !== password) {
            return res.status(401).send({ msg: "Invalid password" });
        }
        
        res.send({ msg: "Login successful", token:token ,status:200})
    });
};

const userHome = (req, res) => {
    try {       
        const token = req.headers.token;
        if (!token) {
            return res.status(401).send({ msg: "No token provided" });
        }
            const decoded = jwt.decode(token);  
            const id = decoded.data.id; 
            const sql = "SELECT * FROM userdata WHERE id = ?";
                   db.query(sql, [id], (err, results) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).send({ msg: "Database error", error: err });
                }

                if (results.length === 0) {
                    return res.status(404).send({ msg: "User not found" });
                }
                res.send({ msg: "User found", user: results[0] });
            });
          } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
    }
}

module.exports = { registerUser, loginUser ,userHome};
