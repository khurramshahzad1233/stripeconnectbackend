import catchasyncerror from "../middleware/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js"
import dotenv from "dotenv"
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};
import stripe from "stripe";

let secretKey=process.env.STRIPE_SECRET_KEY

export const createuseraccount=catchasyncerror(async(req,res,next)=>{
    
    const stripeClient = new stripe(secretKey,{
        apiVersion:"2022-11-15"
    });


    const account = await stripeClient.accounts.create({
        country:"FR",
        type: 'express',
        capabilities: {
            card_payments: {
              requested: true,
            },
            transfers: {
              requested: true,
            },
          },
        //   business_type:"individual",
          business_profile:{
            url:"https://www.trips.com",
          },
        
        });
        let connectedId=account.id
        res.status(200).json({
            success:true,
            connectedId
        })


        });


        export const creatteacheraccountlink=catchasyncerror(async(req,res,next)=>{
    
            const stripeClient = new stripe(secretKey,{
                apiVersion:"2022-11-15"
            });
        
        
            const accountlink = await stripeClient.accountLinks.create({
                account: 'acct_1NfbyY4IVBdJL5It',
                type:"account_onboarding",
                return_url:"http://localhost:5000/success/account",
                refresh_url:"http://localhost:5000/error",

                
                });
                let accountLinkURL=accountlink.url;
                res.status(200).json({
                    success:true,
                    accountLinkURL,
                })
        
        
                });


                // check create account status 
                export const checkaccountstatus=catchasyncerror(async(req,res,next)=>{
    
                    const stripeClient = new stripe(secretKey,{
                        apiVersion:"2022-11-15"
                    });
                
                
                    const account = await stripeClient.accounts.retrieve("acct_1NfbyY4IVBdJL5It");
        
                        res.status(200).json({
                            success:true,
                            account,
                        })
                
                
                        });


                // create a payment intent

                export const createPaymentIntent=catchasyncerror(async(req,res,next)=>{
                    const stripeClient = new stripe(secretKey);
                    let totalAmount=10000
                    let plateformAmount=totalAmount*0.20;
                    let teacherAmount=totalAmount*0.80;
        
                    
                    const paymentIntent=await stripeClient.paymentIntents.create({
                        amount:teacherAmount,
                        currency:"usd",
                        automatic_payment_methods:{
                            enabled:true,
                        },
                        application_fee_amount:plateformAmount,
                        transfer_data:{
                            destination:"acct_1NeikQQSmFQD5Tbs"
                        }
                    });
                    res.status(200).json({
                        success:true,
                        clientSecret:paymentIntent.client_secret,
                    })
                });


                    // first pay to plateform account then get a charge reference from it
        export const createPaymenttref=catchasyncerror(async(req,res,next)=>{
            const stripeClient = new stripe(secretKey);
            let totalAmount=10000


            const paymentIntent=await stripeClient.paymentIntents.create({
                amount:totalAmount,
                currency:"usd",
                automatic_payment_methods:{
                    enabled:true,
                },
                on_behalf_of:"acct_1NehzmQK1BAyvZUk"
            })
            
           
            res.status(200).json({
                success:true,
                clientSecret:paymentIntent.client_secret,
            })

            

        });


        export const transferPayment=catchasyncerror(async(req,res,next)=>{
            const stripeClient = new stripe(secretKey);
            let totalAmount=10000
            
            const transfer=await stripeClient.transfers.create({
                amount:5000,
                currency:"GBP",
                source_transaction:"ch_3NexazKyWdxd7Wws2KYo5ClO",
                destination:"acct_1NehzmQK1BAyvZUk"
            })
            res.status(200).json({
                success:true,
                transfer,
            })

            

        });




        