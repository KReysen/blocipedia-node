const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

 // public wikis
  new() {
    return this._isMember() || this._isAdmin() || this._isPremium();
  }

  create() {
    return this.new();
  }

  edit() {
    return this._isMember() || this._isAdmin() || this._isPremium();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }

  makePrivate() {
    return this._isPremium() || this._isAdmin();
  }

  createPrivate() {
    return this.newPrivate();
  }
}