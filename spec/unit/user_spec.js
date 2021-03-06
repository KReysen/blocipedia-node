const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

  beforeEach((done) => {
// #1
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("#create()", () => {

// #2
    it("should create a User object with a valid email, password, and username", (done) => {
      User.create({
        username: "Leroy Jenkins",
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

// #3
    it("should not create a user with invalid email or password", (done) => {
      User.create({
        username: "Mario",
        email: "It's-a me, Mario!",
        password: "1234567890"
      })
      .then((user) => {

        // The code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there.

        done();
      })
      .catch((err) => {
// #4
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with an email already taken", (done) => {

// #5
      User.create({
        username: "Example",
        email: "user@example.com",
        password: "1234567890"
      })
      
      .then((user) => {

        User.create({
          username: "Copycat",
          email: "user@example.com",
          password: "nananananananananananananananana BATMAN!"
        })
        .then((user) => {

          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there
          console.log("Block!");

          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          console.log(err.message);
          done();
        });

        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

});