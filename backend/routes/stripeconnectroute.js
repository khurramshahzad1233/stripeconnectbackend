
import express from "express"
import { checkaccountstatus, createPaymentIntent, createPaymenttref, createuseraccount, creatteacheraccountlink, transferPayment } from "../controller/stripeconnectcontroller.js";

const router=express.Router();
router.route("/stripe/user/new").post(createuseraccount);
router.route("/stripe/account/link").post(creatteacheraccountlink);
router.route("/stripe/account/status").post(checkaccountstatus)
router.route('/stripe/paymentintent').post(createPaymentIntent);
router.route("/stripe/paymentref").post(createPaymenttref)
router.route("/stripe/transfer").post(transferPayment)




export default router  ;