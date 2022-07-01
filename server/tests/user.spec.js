const  app  = require('../../app');
const request  = require('supertest');
const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
require("dotenv").config();
const basededatos = process.env.DB_URI;


describe('/V1/USERS', () => {

    let connection;
    var token ="";
    var tokenUser ="";
    beforeAll(async () => {
        connection = await mongoose.connect(basededatos)
        .then(db=>console.log("Base de datos conectada"))
        .catch(err=>console.error("Error "+err));
        
    });

    test('/CREATE' , async () =>{
        
        const response = await request(app).post('/v1/users/create/')
        .send({
            name:"Alex",
            password:"losalosa",
            email:"losmaralerestaurante@gmail.com",
            active:false,
            photoProfile:""
        })
        expect(response.statusCode).toBe(200);
        expect(response.body['Message']).toMatch(/Email ya registrado/);
        
        const response2 = await request(app).post('/v1/users/create/')
        .send({
            name:"Alex",
            password:"losalosa",
            email:"losma@gmail.com",
            active:false,
            photoProfile:""
        })
        expect(response2.statusCode).toBe(200);
        expect(response2.body['Message']).toMatch(/Registro completado/);
        
    })


    test('/LOGIN' , async () =>{
        
        const response = await request(app).post('/v1/users/login')
        .send({
            password:"losalosa",
            email:"losamaral@gmail.com",
        })
        expect(response.statusCode).toBe(200);
        expect(response.body['Message']).toMatch(/Email no encontrado/);
        
        const response2 = await request(app).post('/v1/users/login')
        .send({
            password:"losalosa",
            email:"losma@gmail.com",
        })
        expect(response2.statusCode).toBe(200);
        expect(response2.body['Message']).toMatch(/Usuario encontrado/);
        expect.stringContaining(response2.body['token'])
        token=response2.body['token']
    })

    test('/VERIFY' , async () =>{
        
        const response = await request(app).post('/v1/users/verify/errortoken')
        .send()
        expect(response.statusCode).toBe(200);
        expect(response.body['Message']).toMatch(/Token no autorizado/);
        
        const response2 = await request(app).post('/v1/users/verify/'+token)
        .send();
        expect(response2.statusCode).toBe(200);
        expect(response2.body['Message']).toMatch(/Token autorizado/);
        tokenUser=response2.body['tokenUser']
        
    })

    test('/ACTIVATE' , async () =>{
        
        const response = await request(app).get('/v1/users/activate/errortoken')
        .send()
        expect(response.statusCode).toBe(200);
        expect(response.body['Message']).toMatch(/Error al activar el registro/);
        
        const response2 = await request(app).get('/v1/users/activate/'+tokenUser)
        .send()
        expect(response2.statusCode).toBe(200);
        expect(response2.body['Message']).toMatch(/Registro actualizado/);
        
    })

    test('/FORGOT' , async () =>{
        
        const response = await request(app).get('/v1/users/forgot/losmarale@gmail.com')
        .send()
        expect(response.statusCode).toBe(200);
        expect(response.body['Message']).toMatch(/Email no encontrado/);
        
        const response2 = await request(app).get('/v1/users/forgot/losma@gmail.com')
        .send()
        expect(response2.statusCode).toBe(200);
        expect(response2.body['Message']).toMatch(/Email de recuperación enviado/);
        
    })

    test('/DELETE' , async () =>{
        
        const response = await request(app).delete('/v1/users/delete/234sdgfsdgsd')
        .send()
        expect(response.statusCode).toBe(200);
        expect(response.body['Message']).toMatch(/Error al borrar el registro/);
        
        const response2 = await request(app).delete('/v1/users/delete/'+tokenUser)
        .send()
        expect(response2.statusCode).toBe(200);
        expect(response2.body['Message']).toMatch(/Registro borrado/);
        
    })


})

