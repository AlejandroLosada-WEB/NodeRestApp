const  app  = require('../../app');
const request  = require('supertest');
const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
require("dotenv").config();
const basededatos = process.env.DB_URI;


describe('/V1/USERS', () => {

    let connection;
    var id_photo_delete="";
    var id_user="234kjlknhjwfsdfi7y234";
    beforeAll(async () => {
        connection = await mongoose.connect(basededatos)
        .then(db=>console.log("Base de datos conectada"))
        .catch(err=>console.error("Error "+err));
        
    });

    test('/CREATE' , async () =>{
        
        const response = await request(app).post('/v1/photos/create/')
        .send({
            _id_user:id_user, 
            path:"./assets/users/61fabc7e3992996688d37ba4/photos/photo4539649.jpg",
        })
        expect(response.statusCode).toBe(200);
        expect(response.body['Message']).toMatch(/Registro completado/);
        
        
    })

    test('/GETALL' , async () =>{
        const response = await request(app).get('/v1/photos/getAll/')
        .send()
        expect(response.statusCode).toBe(200);
        expect.arrayContaining(response)

    })
    test('/GETALLPHOTOSUSER' , async () =>{
        const response = await request(app).get('/v1/photos/getAllPhotosUser/'+id_user)
        .send()
        expect(response.statusCode).toBe(200);
        expect.arrayContaining(response)
        id_photo_delete=response.body[0]._id;
        console.log(response.body)

    })
    test('/GETALLPHOTOSUSERWHITCOMENTS' , async () =>{
        const response = await request(app).get('/v1/photos/getPhotosWithComments/'+id_user)
        .send()
        expect(response.statusCode).toBe(200);
        expect.arrayContaining(response)

    })

    test('/GETALLPHOTOSUSERWHITOUTCOMENTS' , async () =>{
        const response = await request(app).get('/v1/photos/getPhotosWithOutComments/'+id_user)
        .send()
        expect(response.statusCode).toBe(200);
        expect.arrayContaining(response)

    })

    

    test('/UPDATE' , async () =>{
        const response = await request(app).put('/v1/photos/update/errorid')
        .send({
            _id_user:id_user, 
            path:"./assets/users/61fabc7e3992996688d37ba4/photos/photo4539649.png",
        })
        expect(response.statusCode).toBe(200);
        expect(response.body['Message']).toMatch(/Error al actualizar el registro/);

        const response2 = await request(app).put('/v1/photos/update/'+id_photo_delete)
        .send({
            _id_user:id_user, 
            path:"./assets/users/61fabc7e3992996688d37ba4/photos/photo4539649.png",
        })
        expect(response2.statusCode).toBe(200);
        expect(response2.body['Message']).toMatch(/Registro actualizado/);
        
        
    })

    test('/DELETE' , async () =>{
        const response = await request(app).delete('/v1/photos/delete/errorid')
        .send()
        expect(response.statusCode).toBe(200);
        expect(response.body['Message']).toMatch(/Error al borrar el registro/);

        const response2 = await request(app).delete('/v1/photos/delete/'+id_photo_delete)
        .send()
        expect(response2.statusCode).toBe(200);
        expect(response2.body['Message']).toMatch(/Registro borrado/);


    })


})