var config = {
    port: process.env.PORT || 3000
};

config.mongodb = {};
if(process.env.MONGODB_URI){
    config.mongodb.uri = process.env.MONGODB_URI
}else{
    config.mongodb.host = process.env.MONGODB_HOST || 'localhost';
    config.mongodb.port = process.env.MONGODB_PORT || 27017;
    config.mongodb.database_name = process.env.DATABASE_NAME || 'aui';
    config.mongodb.uri =  'mongodb://' + config.mongodb.host + '/' + config.mongodb.database_name;
}

module.exports = config;