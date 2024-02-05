const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://i.natgeofe.com/k/f027ff62-8d64-49eb-8fb4-4bb79cf86166/redwood-forest.jpg?w=1084.125&h=609",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, quibusdam nemo? Non, ipsam sed. Totam, dignissimos deserunt laboriosam dolor quos commodi, consectetur cumque nam voluptas placeat excepturi. Eum, voluptatum provident.",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});