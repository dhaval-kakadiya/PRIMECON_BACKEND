const { handleException } = require("../helpers/exception");
const Response = require("../helpers/response");
const Constant = require("../helpers/constant");
const userModel = require("../models/user");
const formateValidation = require("../helpers/joi-validation");
const nodemailer = require("nodemailer");

const addUser = async (req, res) => {
  const { logger } = req;
  try {
    const userData = req.body;
    const { email } = req.body;

    const { error } = formateValidation.emailVerification({ email });
    if (error) {
      const obj = {
        res,
        status: Constant.STATUS_CODE.BAD_REQUEST,
        msg: error.details[0].message,
      };
      return Response.error(obj);
    }
    const saveUser = await userModel.create(userData);
    if (!saveUser) {
      const obj = {
        res,
        status: Constant.STATUS_CODE.BAD_REQUEST,
        msg: Constant.ERROR_MSGS.CREATE_ERR,
      };
      return Response.error(obj);
    } else {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.PRIMECON_EMAIL, // generated ethereal user
          pass: process.env.PRIMECON_EMAIL_PW, // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: `${process.env.PRIMECON_EMAIL}`, // sender address
        to: `${email}`, // list of receivers
        subject: "Thank For Contecting PRIMECON Contruction", // Subject line
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>E-mail</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Alkatra&family=Poppins&display=swap"
              rel="stylesheet"
            />
            <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            .G_1 {
              height: 100vh;
              width: 100%;

            }

            .G_2 {
              height: 660px;
              width: 601px;
              display: flex;
              margin: 0 auto;
              font-family: 'Poppins', sans-serif;
            }

            .child-one {
              height: 78px;
              width: 100%;
              background: #212d92;
              display: flex;
              align-items: center;
              padding: 20px;
            }

            .child-two {
              height: 492px;
              width: 100%;
              padding: 45px;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 21px;
              left: 4.99%;
              right: 4.99%;
              top: 17.44%;
              bottom: 20.99%;


            }

            p {
              text-align: auto;

            }

            .child-three {
              height: 89px;
              width: 100%;
              text-align: center;
              padding: 20px;
              background-color: #D9D9D9;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 18px;
            }

            .center {
              display: block;
              margin-left: auto;
              margin-right: auto;
              margin-top: 5px;
            }
          </style>
          </head>
          <body>
            <div class="G_1">
              <div class="G_2">
               <div>
                <div class="child-one">
                    <img src="https://firebasestorage.googleapis.com/v0/b/primecon-7629b.appspot.com/o/icon1.png?alt=media&token=c5c6cdc0-ac07-446a-adda-daaa17cff349" width="116.34px" height="39px" >
                  </div>

                  <div class="child-two">
                    <p>Dear ${req.body.name},</p>
                    <br>

                    <p>
                      Thank you for reaching out to <b>Primecon Contrsuction.</b> We appreciate
                      your interest in our services and the opportunity to discuss your
                      construction needs.
                    </p>
                    <br>

                    <p>
                      We have received your message and will review it promptly. Our team
                      is dedicated to providing exceptional customer service and we will
                      do our best to respond to you at the earliest possible time.
                    </p>
                    <br>

                    <p>
                      If you have any further questions or concerns, please do not
                      hesitate to contact us. We are always available to assist you with
                      your construction needs.
                    </p>
                    <br>

                    <p>
                      Thank you once again for considering Primecon Construction for your
                      project. We look forward to the opportunity to work with you.
                    </p>
                    <br>

                    <p>
                      Best regards,<br />
                      Primecon
                    </p>
                  </div>
                  <div class="child-three">
                    <p>
                      Please note that the email you have received is generated
                      automatically by our system.
                    </p>
                    <img class="center" src="https://firebasestorage.googleapis.com/v0/b/primecon-7629b.appspot.com/o/icon2.png?alt=media&token=c14cdb8f-18f7-46f7-9174-5964cd372e4e" width="79px"  height="26.7px">
               </div>
              </div>
            </div>
          </body>
        </html>
        `, // html body
      });

      let info2 = await transporter.sendMail({
        from: `${process.env.PRIMECON_EMAIL}`, // sender address
        to: `${process.env.PRIMECON_EMAIL}`, // list of receivers
        subject: "User Visit On PRIMECON", // Subject line
        html: `<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    line-height: 20px;
                    /* color: #333333; */
                }
                table,
                th,
                td {
                    border: solid 3px #000;
                    padding: 10px;
                    outline: none;
                }

                table {
                    border-collapse: collapse;
                    caption-side: bottom;
                    border-radius: 10%;
                }

                caption {
                    font-size: 16px;
                    font-weight: bold;
                    padding-top: 5px;
                }
            </style>
        </head>

        <body>
            <table>
                <thead>
                    <tr>
                        PRIMECON Visited Uer Detail's
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>User Name</td>
                        <td>${req.body.name}</td>
                    </tr>
                    <tr>
                        <td>User Email</td>
                        <td>${req.body.email}</td>
                    </tr>
                    <tr>
                        <td>User MobileNo</td>
                        <td>${req.body.phone}</td>
                    </tr>
                    <tr>
                        <td>User Post Code</td>
                        <td>${req.body.pinCode}</td>
                    </tr>
                    <tr>
                        <td>User Message</td>
                        <td>${req.body.message}</td>

                    </tr>
                </tbody>
            </table>
        </body>

        </html>`, // html body
      });
      console.log("info2", info2);
      const obj = {
        res,
        msg: Constant.INFO_MSGS.CREATED_SUCCESSFULLY,
        status: Constant.STATUS_CODE.OK,
        data: saveUser,
      };
      return Response.success(obj);
    }
  } catch (error) {
    console.log("error", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  addUser,
};
