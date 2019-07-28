const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";
const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;



describe("routes : wikis", () => {
    beforeEach((done) => {
        this.wiki;
        sequelize.sync({force: true}).then((res) => {
            Wiki.create({
                title: "JS Frameworks",
                body: "There are a lot of them",
                private: false 
            })
            .then((wiki) => {
                this.wiki = wiki;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("GET /wikis", () => {
        it("should return a status code 200 and all wikis", (done) => {
            request.get(base, (err, res, body) => {
              expect(res.statusCode).toBe(200);
              expect(err).toBeNull();
              expect(body).toContain("Wikis");
              expect(body).toContain("JS Frameworks");
              done();
            });
        });
    });

    describe("GET /wikis/new", () => {
        
        it("should render a new wiki form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Wiki");
                done();
            });
        });
    });

    describe("POST /wikis/create", () => {
        const options = {
            url: `${base}create`, 
            form: {
                title: "blink-182 songs",
                body: "All the hits"
            }
        };
        it("should create a new wiki and redirect", (done) => {
            request.post(options,
                (err, res, body) => {
                    Wiki.findOne({where: {title: "blink-182 songs"}})
                    .then((wiki) => {
                        expect(res.statusCode).toBe(303);
                        expect(wiki.title).toBe("blink-182 songs");
                        expect(wiki.body).toBe("All the hits");
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
        });
    });

    describe("GET /wikis/:id", () => {
        it("should render a view with the selected wiki", (done) => {
            request.get(`${base}${this.wiki.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("JS Frameworks");
                done();
            });
        });
    });

});