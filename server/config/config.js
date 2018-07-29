const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'secret',
        DATABASE: 'mongodb://localhost:27017/offers'
    }
}

exports.get = function get(env){
    return config[env] || config.default
} 