import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";

import "../database";
import routes from "../routes";

const app = express();
app.use(express.json());
app.use(routes);

chai.use(chaiHttp);
chai.should();

describe("Adventures", () => {
  beforeAll(() => {
    app.listen(3333);
  });

  describe("POST /users/:user_id/aventura", () => {
    it("should create an adventure", async done => {
      chai
        .request(app)
        .post("/users/2/aventura")
        .send({
          title: "test",
          date: "04/11/1999",
          location: "test folder",
          description: "a test"
        })
        .end((err, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.an("object");
          done();
        });
    });
  });

  describe("GET /aventura", () => {
    it("should get all adventure records", done => {
      chai
        .request(app)
        .get("/aventura")
        .end((err, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("PUT /aventura/:adventure_id", () => {
    it("should update an adventure", done => {
      chai
        .request(app)
        .put("/aventura/3")
        .send({
          title: "test update",
          date: "04/11/2019",
          location: "test folder",
          description: "a test"
        })
        .end((err, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("GET /tipo-aventura", () => {
    it("should get all adventure type records", done => {
      chai
        .request(app)
        .get("/tipo-aventura")
        .end((err, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.an("array");
          done();
        });
    });
  });
});
