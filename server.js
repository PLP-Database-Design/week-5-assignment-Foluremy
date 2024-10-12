// Import our dependencies
const express = require("express")
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')

// Configure environment variables
dotenv.config()

// Create a connection object
const db = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
})

// Test the connection
db.connect((err) => {
    // If the connection is not successful
    if(err) {
        return console.log('Error connecting to the database: ', err)
}

    //  If the connection is successful
    console.log('Successfully connected to mySQL: ', db.threadId)
})

// import ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 

// Questin 1 - Retrieve all patients
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, DATE_FORMAT(date_of_birth, '%d/%m/%Y') AS formatted_dob  FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send('Failed to get patients', err)
    }
    
    res.status(200).render('data', { data })
}) 
})   

// Question 2 - Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        if(err) {
            return res.status(400).send('Failed to get providers', err)
    }

    res.status(200).render('data', { data })
}) 
}) 

// Question 3 - Retrieve patients by first name
app.get('/patientsFirstName', (req, res) => {
    const getPatientsFirstName = "SELECT * FROM patients ORDER BY first_name ASC"
    db.query(getPatientsFirstName, (err, data) => {
        if(err) {
            return res.status(400).send('Failed to get patients', err)
    }

    res.status(200).render('data', { data })
}) 
}) 

// Question 4 - Retrieve providers by specialty
app.get('/providersSpecialty', (req, res) => {
    const getProvidersSpecialty = "SELECT * FROM providers ORDER BY provider_specialty ASC"
    db.query(getProvidersSpecialty, (err, data) => {
        if(err) {
            return res.status(400).send('Failed to get providers', err)
    }

    res.status(200).render('data', { data })
}) 
}) 


// Start and listen to the server
,app.listen(3301, () => {
    console.log('Server is running on port 3301...')
})  


