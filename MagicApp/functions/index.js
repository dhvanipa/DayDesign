//not written by a software engineer.

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();

const stripe = require('stripe')(functions.config().stripe.token);

function charge(req, res) {
    const body = JSON.parse(req.body);
    const token = body.token;
    const amount = body.charge.amount;
    const currency = body.charge.currency;
    
    stripe.customers.create({
                          email: "dhrumil@gmail.com",
                          source: token,
                          });
    
    const customer = stripe.customers.retrieve('cus_EmHB13vlVdmsK6');

    stripe.charges.create({
                          amount,
                          currency,
                          customer: 'cus_EmHB13vlVdmsK6', // obtained with Stripe.js
                          }).then(charge => {
                                                                    send(res, 200, {
                                                                         message: 'Success',
                                                                         charge,
                                                                         });
                                                                    }).catch(err => {
                                                                             console.log(err);
                                                                             send(res, 500, {
                                                                                  error: err.message,
                                                                                  });
                                                                             });
    
    
//    stripe.charges.create({
//                          amount,
//                          currency,
//                          description: 'Firebase Example',
//                          source: token,
//                          }).then(charge => {
//                                  send(res, 200, {
//                                       message: 'Success',
//                                       charge,
//                                       });
//                                  }).catch(err => {
//                                           console.log(err);
//                                           send(res, 500, {
//                                                error: err.message,
//                                                });
//                                           });
}

function send(res, code, body) {
    res.send({
             statusCode: code,
             headers: {'Access-Control-Allow-Origin': '*'},
             body: JSON.stringify(body),
             });
}

app.use(cors);
app.post('/', (req, res) => {
         
         try {
         charge(req, res);
         } catch(e) {
         console.log(e);
         send(res, 500, {
              error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
              });
         }
         });

exports.charge = functions.https.onRequest(app);
