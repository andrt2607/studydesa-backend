const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../routes/desaRouter');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Integration Tests for Desa', () => {
  it('should create a new desa', (done) => {
        chai
          .request(app)
          .post("/")
          //   .set("Authorization", `Bearer ${token}`)
        //   .set("Cookie", `jwt=${token}`)
          .send({
            name: "permai",
            problem: "tes",
            lat_des: "tes",
            long_des: "tes",
            photo:
              "https://i.pinimg.com/736x/19/a6/9c/19a69ca0b8611c1adf3482cbc56da66a.jpg",
            contact_person: "081217915595",
          }).end((err, res) => {
            expect(res).to.have.status(201);
            // expect(res.body).to.have.property('userId');
            done();
          });
    //     expect(res).to.have.status(201);
    //     done();
    //   });
  });

//   it('should retrieve user information', (done) => {
//     chai.request(app)
//       .get('/api/users/braveknight')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.username).to.equal('braveknight');
//         done();
//       });
//   });
});