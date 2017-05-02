const mongoose = require('mongoose');
const user = require('./../models/user');
const authentication = require('./../middleware/authentication');
const bcrypt = require('bcrypt-node');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../app');
const should = chai.should();

chai.use(chaiHttp);

const userSchemaTest = {
    login: {
        username: "Rafael Dev",
        password: "r341p0nt0"
    },
    badgeID: '123456',
    address: {
        street: "Rua Dr Cincinato Braga",
        number: 296,
        state: "São Paulo",
        city: "São Bernardo do Campo",
        cep: 12355
    },
    contact: {
        email: "rafa",
        tel: 1234567
    },
    roles: ["Adminstrador"]
}

const userSchemaTestUpdated = {
     login: {
        username: "Alexandre Dev",
        password: "x1ba026404"
    },
    badgeID: '123456',
    address: {
        street: "Rua São Pedro Brasil",
        number: 51,
        state: "Pindamonhagaba",
        city: "SBC",
        cep: 09825187
    },
    contact: {
        email: "alexandre@alexandre.com.br",
        tel: 982452477
    },
    roles: ["Supervisor"]
}


let token;

describe('users', () => {
    beforeEach((done) => { 
        user.remove({}, (err) => {
           done();
        });
    });

    before((done) => {
            chai.request(server)
            .post('/login')
            .send({
                username: userSchemaTest.login.username,
                password: userSchemaTest.login.password
            })
            .then(res => {
                token = res.body.token; 
                done();
            }).catch(error => {
                done(error);
            });
    });
  

describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
            .get('/api/users')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });


    describe('/GET/:id users', () => {
     it('it should GET a user by the given id', (done) => {
       let Users = new user(userSchemaTest);
         Users.save((err, oneuser) => {
           chai.request(server)
           .get('/api/users/' + oneuser.id)
           .set('x-access-token', token)
           .send(oneuser)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.login.should.have.property('username').eql(userSchemaTest.login.username);
               res.body.address.should.have.property('street').eql(userSchemaTest.address.street);
               res.body.address.should.have.property('number').eql(userSchemaTest.address.number);
               res.body.address.should.have.property('state').eql(userSchemaTest.address.state);
               res.body.address.should.have.property('city').eql(userSchemaTest.address.city);
               res.body.address.should.have.property('cep').eql(userSchemaTest.address.cep);
               res.body.contact.should.have.property('email').eql(userSchemaTest.contact.email);
               res.body.contact.should.have.property('tel').eql(userSchemaTest.contact.tel);
               res.body.should.have.property('_id').eql(oneuser.id);
             done();
            });
          });
        });
      });

    describe ('/POST a user', () => {
      it('it should post a user', (done) => {
        let Users = new user(userSchemaTest)
          chai.request(server)
          .post('/api/users')
          .set('x-access-token', token)
          .send(Users)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.login.should.have.property('username').eql(userSchemaTest.login.username);
            res.body.should.have.property('badgeID').eql(userSchemaTest.badgeID);
            res.body.address.should.have.property('street').eql(userSchemaTest.address.street);
            res.body.address.should.have.property('number').eql(userSchemaTest.address.number);
            res.body.address.should.have.property('state').eql(userSchemaTest.address.state);
            res.body.address.should.have.property('city').eql(userSchemaTest.address.city);
            res.body.address.should.have.property('cep').eql(userSchemaTest.address.cep);
            res.body.contact.should.have.property('email').eql(userSchemaTest.contact.email);
            res.body.contact.should.have.property('tel').eql(userSchemaTest.contact.tel);
            res.body.should.have.property('roles').eql(userSchemaTest.roles);
            done();
        });
      });
    });

        describe('/DELETE:id User', () => {
      it('it should remove a user', (done) => {
          let User = new user(userSchemaTest);
          User.save((err, oneuser) => {
            chai.request(server)
            .delete('/api/users/' + oneuser.id)
            .set('x-access-token', token)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('deletedUser')
            res.body.should.have.property('message').eql('User was removed!');
            res.body.deletedUser.should.have.property('ok').eql(1);
            res.body.deletedUser.should.have.property('n').eql(1); 
            done();
          });
      });
    });
  });
});


  describe('/UPDATE/:id user', () => {
      it('it should UPDATE a user given the id', (done) => {
       let Users = new user(userSchemaTest);
        Users.save((err, oneuser) => {
                chai.request(server)
                .put('/api/users/' + oneuser.id)
                .set('x-access-token', token)
                .send(userSchemaTestUpdated)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('login');
                    res.body.login.should.have.property('username').eql(userSchemaTestUpdated.login.username);
                    res.body.should.have.property('badgeID').eql(userSchemaTestUpdated.badgeID);
                    res.body.address.should.have.property('street').eql(userSchemaTestUpdated.address.street);
                    res.body.address.should.have.property('number').eql(userSchemaTestUpdated.address.number);
                    res.body.address.should.have.property('state').eql(userSchemaTestUpdated.address.state);
                    res.body.address.should.have.property('city').eql(userSchemaTestUpdated.address.city);
                    res.body.address.should.have.property('cep').eql(userSchemaTestUpdated.address.cep);
                    res.body.contact.should.have.property('email').eql(userSchemaTestUpdated.contact.email);
                    res.body.contact.should.have.property('tel').eql(userSchemaTestUpdated.contact.tel);
                    res.body.should.have.property('roles').eql(userSchemaTestUpdated.roles);
                    bcrypt.compare(userSchemaTestUpdated.login.password, res.body.login.password, (err , isMatch)=>{
                        isMatch.should.be.eql(true);
                        done();
                    });
                });
          });
      });
  });


