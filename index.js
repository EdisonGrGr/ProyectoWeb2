const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const sequelize = require('./db/sequelize');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);


sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error('Error syncing the database:', error);
});
