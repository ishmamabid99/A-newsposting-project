const mongoose = require('mongoose');


const clusterSchema = new mongoose.Schema({
    data:{
        type :String,
        required: false 
    }
});
const Cluster = mongoose.model('news',clusterSchema);

module.exports = Cluster;