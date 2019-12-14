const databaseConnector = require('../routes/databaseConnector');

function Photo() {};

Photo.prototype = {
    createPost: function(body, callback) {

        let photo = [body.title, body.description, body.fk_userid, body.imageURL];
        let sql = `INSERT IGNORE INTO imageposts (title, description, fk_userid, photopath value (?, ?, ?, ?)`;

        databaseConnector.query(sql, photo, function(err, lastId) {
            if (err) throw err;
            console.log("Last Image ID: ",lastId.insertId);
            callback(lastId.insertId);
        });
    },

    findImage: async function (image = null, callback){
        try{
            if(image) {
                let field = Number.isInteger(image) ? 'id' : 'title';
                let sql = `SELECT * FROM imageposts WHERE ${field} = ?`;
                await databaseConnector.query(sql, image, (err, result) => {
                    console.log("Finding image...");
                    if(err) throw err;
                    if(result.length) {
                        console.log("Image found!");
                        callback(result);
                    }
                    else {
                        console.log('Image could not be found');
                    }
                });
            }
        } catch (error)
        {
            console.log(error);
        }
    }
};

module.exports = Photo;