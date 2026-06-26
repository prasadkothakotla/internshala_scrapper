const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server running');
});
app.post('/scrape', async (req,res)=>{

    const role = req.body.role;

    console.log("Searching:", role);

    // temporary response
    res.json({
        role: role,
        company: "Demo Company",
        location: "Remote",
        updated: new Date()
    });

});
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on ${PORT}`);
});