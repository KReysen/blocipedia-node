module.exports = class ApplicationPolicy {

    // #1
     constructor(user, record) {
       this.user = user;
       this.record = record;
     }
   
    // #2
     _isOwner() {
       return this.record && (this.record.userId == this.user.id);
     }
   
     _isMember() {
       return this.user && (this.user.role == '0');
     }
   
     _isPremium() {
       return this.user && (this.user.role == '1');
     }
   
     _isAdmin() {
       return this.user && (this.user.role == '2');
     }
   
    // #3
     new() {
       return this.user != null;
     }
   
     create() {
       return this.new();
     }
   
     show() {
       return true;
     }
   
    // #4
     edit() {
       return this.new() &&
         this.record && (this._isMember() || this._isAdmin() || this._isPremium());
     }
   
     update() {
       return this.edit();
     }
   
    // #5
     destroy() {
       return this.update();
     }
   };