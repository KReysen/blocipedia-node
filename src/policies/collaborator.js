const ApplicationPolicy = require("./application");

module.exports = class CollaboratorPolicy extends ApplicationPolicy {
    
    add(){
        return this._isAdmin() || this._isPremium();
    }

    destroy() {

    }
}