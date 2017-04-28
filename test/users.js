const mongoose = require('mongoose');
const user = require('./../models/user');
const authentication = require('./../middleware/authentication');

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
    badgeID: 123456,
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
    badgeID: 2121,
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


describe('users', () => {
    beforeEach((done) => { 
        user.remove({}, (err) => {
           done();
        });
    });

describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
            .get('/api/users')
            .set('x-access-token', 'token')
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
           .set('x-access-token', 'token')
           .send(oneuser)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.login.should.have.property('username').eql('Rafael Dev');
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
          .set('x-access-token', 'token')
          .send(Users)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.login.should.have.property('username').eql('Rafael Dev');
            res.body.login.should.have.property('password');
            res.body.should.have.property('badgeID').eql('123456');
            res.body.address.should.have.property('street').eql('Rua Dr Cincinato Braga');
            res.body.address.should.have.property('number').eql(296);
            res.body.address.should.have.property('state').eql('São Paulo');
            res.body.address.should.have.property('city').eql('São Bernardo do Campo');
            res.body.address.should.have.property('cep').eql(12355);
            res.body.contact.should.have.property('email').eql('rafa');
            res.body.contact.should.have.property('tel').eql(1234567);
            res.body.should.have.property('roles').eql(['Adminstrador']);
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
            .set('x-access-token', 'token')
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
                .set('x-access-token', 'token')
                .send(userSchemaTestUpdated)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('The user was updated');
                    res.body.updatedUser.should.have.property('badgeID');
                    res.body.updatedUser.login.should.have.property('username').eql('Alexandre Dev');
                    res.body.updatedUser.login.should.have.property('password');
                    res.body.updatedUser.contact.should.have.property('email').eql('alexandre@alexandre.com.br');
                    res.body.updatedUser.contact.should.have.property('tel').eql(982452477);
                    res.body.updatedUser.should.have.property('roles').eql(['Supervisor']);
                    res.body.updatedUser.address.should.have.property('street').eql('Rua São Pedro Brasil');
                    res.body.updatedUser.address.should.have.property('number').eql(51);
                    res.body.updatedUser.address.should.have.property('state').eql('Pindamonhagaba');
                    res.body.updatedUser.address.should.have.property('city').eql('SBC');
                    res.body.updatedUser.address.should.have.property('cep').eql(09825187);
                  done();
                });
          });
      });
  });


