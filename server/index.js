require('dotenv').config();
const express = require('express');
const session = require('express-session');
const user = require('./controllers/userCtrl');
const budget = require('./controllers/budgetCtrl');

const { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();
app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.get('/auth/user-data', user.userData)
app.get('/auth/logout', user.logout)
app.post('/auth/login', user.login)

app.use((req, res, next) => {
  if (req.session.user) return next();
  else res.sendStatus(401);
})

app.get('/api/budget-data', budget.budgetData)
app.post('/api/budget-data/purchase', budget.purchase);
app.delete('/api/budget-data/purchase/:id', budget.remove)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
