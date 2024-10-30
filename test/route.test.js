// const { expect } = require("chai");
const chai = require("chai");
const request = require("supertest");
const express = require("express");
const routes = require("../routes");
const desaRouter = require("../routes/desaRouter");
const authRouter = require("../routes/authRouter");
const mahasiswaRouter = require("../routes/mahasiswaRouter");
const jwt = require("jsonwebtoken");

const { client } = require("../config/redis");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const cookieParser = require("cookie-parser");

let token;

// before(() => {
//   client
//     .connect()
//     .then((res) => {
//       // console.log("yey")
//     })
//     .catch((err) => {
//       // console.log("noo")
//     });
//   token = jwt.sign({ username: "testinguser" }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// });

beforeEach(async () => {
  client
    .connect()
    .then((res) => {
      // console.log("yey")
    })
    .catch((err) => {
      // console.log("noo")
    });
  token = jwt.sign({ username: "alfalahalif2" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
});

// after(() => {
//   client.quit();
// });

describe("Test API Desa", () => {
  const app = express();
  // i want use desa router
  app.use(desaRouter);
  app.use(cookieParser());
  app.use(express.json());
  // it("whenDataDesaExistReturnSuccessfull", async () => {
  //   const response = await request(app).get("/");
  //   expect(response.status).to.equal(200);
  //   expect(response.body).to;
  //   expect(response.body.data).to.be.an("array");
  //   expect(response.body.message).to.equal(
  //     "Data semua desa berhasil ditemukan"
  //   );
  // });

  //   it("should return error when data is empty", async () => {
  //     const response = await request(app).get("/");
  //     expect(response.status).to.equal(200);
  //     expect(response.body.data).to.be.an("array").that.is.empty;
  //     expect(response.body.message).to.not("Data kosong");
  //   });

  // it("givenValidDataDesaReturnSuccessfull", async (done) => {
  //   const response = await request(app)
  //     .post("/")
  //     .send({
  //       name: "permai",
  //       problem: "tes",
  //       lat_des: "tes",
  //       long_des: "tes",
  //       photo:
  //         "https://i.pinimg.com/736x/19/a6/9c/19a69ca0b8611c1adf3482cbc56da66a.jpg",
  //       contact_person: "081217915595",
  //     })
  //     .set("Cookie", `jwt=${token}`).then(
  //       (res) => {
  //         expect(res).to.have.status(201);
  //         done();
  //       }
  //     ).end((err, res) => {
  //       expect(res).to.have.status(201);
  //       done();
  //     });
  //   expect(response.status).to.equal(201);
  //   done();
  // });

  it('POST / should successfully create a new item', (done) => {
    request(app)
      .post('/')
      .send({
        name: "permai",
        problem: "tes",
        lat_des: "tes",
        long_des: "tes",
        photo:
          "https://i.pinimg.com/736x/19/a6/9c/19a69ca0b8611c1adf3482cbc56da66a.jpg",
        contact_person: "081217915595",
      })
      .set('Cookie', `jwt=${token}`)
      .expect(201)
      .end((err, response) => {
        expect(response.body).to.have.property('message').to.equal('Item created successfully!');
        // expect(response.body)
        //   .to.have.property('item')
        //   .to.have.property('name')
        //   .to.equal('sample item');
        // expect(response.body).to.have.property('item').to.have.property('price').to.equal(10);
        // expect(response.body).to.have.property('item').to.have.property('rating').to.equal('5');
        // expect(response.body).to.have.property('item').to.have.property('hash').to.equal(hash);
        done(err);
      });
  });

//   it("givenValidDataDesaReturnSuccessfull", async (done) => {
//     console.log("token : ", `Authorization Bearer ${token}`);
//     const res = await chai
//       .request(app)
//       .post("/")
//       //   .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", `jwt=${token}`)
//       .send({
//         name: "permai",
//         problem: "tes",
//         lat_des: "tes",
//         long_des: "tes",
//         photo:
//           "https://i.pinimg.com/736x/19/a6/9c/19a69ca0b8611c1adf3482cbc56da66a.jpg",
//         contact_person: "081217915595",
//       });
//     expect(res).to.have.status(201);
//     done();
//   });
});

// describe("Test API Mahasiswa", () => {
//   it("should update new facculty", async (done) => {
//     const app = express();
//     app.use(mahasiswaRouter);
//     const res = await chai
//       .request(app)
//       .put(`/fakultas`)
//       //   .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", `jwt=${token}`)
//       .send({
//         fakultas_id: 3,
//       });
//     expect(res).to.have.status(200);
//     done();
//   });
// });
