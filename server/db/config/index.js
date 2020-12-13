const mongoose = require('mongoose');

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  console.log('MongoDB has been connected!');
} catch (error) {
  console.log(`Error: ${error}`);
}
