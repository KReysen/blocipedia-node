require("dotenv").config();
const Wiki = require("./models").Wiki;

module.exports = {
    getAllWikis(callback) {
        return Wiki.all()
        .then((wikis) => {
            callback(null, wikis);
        })
        .catch((err) => {
            callback(err);
        })
    },
    addWiki(newWiki, callback){
        return Wiki.create({
            title: newWiki.title,
            body: newWiki.body,
            private: newWiki.private,
            
        })
        .then((wiki) => {
            callback(null, topic);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getWiki(id, callback){
        return Wiki.findById(id)
        .then((wiki) => {
            callback(null, wiki);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deleteWiki(id, callback){
        return Wiki.destroy({
            where: {id}
        })
        .then((topic) => {
            callback(null, topic);
        })
        .catch((err) => {
            callback(err);
        })
    }
}