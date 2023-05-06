const { handleException } = require("../helpers/exception");
const Response = require("../helpers/response");
const Constant = require("../helpers/constant");
const userModel = require("../models/user");
const nodemailer = require("nodemailer");
const { last } = require("underscore");
const { bucket } = require("../helpers/firebaseApp");
const { v4: uuidv4 } = require("uuid");

const addUser = async (req, res) => {
  const { logger } = req;
  try {
    const userData = req.body;
    const { email } = req.body;
    const saveUser = await userModel.create(userData);
    var transporter = nodemailer.createTransport({
      // host: "smtpout.secureserver.net",
      // port: 465,
      service: "gmail",
      host: "smtp.gmail.com",
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.PRIMECON_EMAIL, // generated ethereal user
        pass: process.env.PRIMECON_EMAIL_PW, // generated ethereal password
      },
    });

    var mailOptions1 = {
      from: "info@primecon.ca", // sender address
      to: `${email}`, // list of receivers
      subject: "Thank For Contecting PRIMECON Contruction", // Subject line
      html: `<!DOCTYPE html PUBLIC "-//w3c//dtd xhtml 1.0 transitional//en"
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="https://www.w3.org/1999/xhtml">

  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>User E-mail</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Alkatra&family=Poppins&display=swap" rel="stylesheet" />
      <style>

          body {
              margin: 0;
          }
          table {
              border-spacing: 0;
          }
          td {
              padding: 0;
          }
          img {
              border: 0;
          }
          .wrapper {
              width: 100%;
              table-layout: fixed;
              background-color: white;
              padding-bottom: 40px;
          }
          .main {
              width: 100%;
              max-width: 600px;
              background-color: white;
              box-shadow: 0 0 25px rgb(217, 217, 217);

          }
          .bodyText {
              font-family: 'Poppins', sans-serif;
              font-size: 14px;
              padding: 30px 50px 30px 50px;
          }
          .footer {
              background-color: #D9D9D9;
              padding: 10px 20px 20px 20px;
              font-family: 'Poppins', sans-serif;
              font-size: 12px;
              text-align: center;
          }

      </style>
  </head>
  <body>

      <center class="wrapper">

          <table class="main" width="100%">

              <!-- hearder image -->
              <tr>
                  <td>
                      <img src="https://firebasestorage.googleapis.com/v0/b/primecon-7629b.appspot.com/o/Mail%20Banner.png?alt=media&token=b6f3bcb1-c8bf-48f3-8f80-5be62326a68c" alt="Primecon" width="100%" style="max-width: 100%;">
                  </td>
              </tr>

              <!-- body text -->
              <tr>
                  <td class="bodyText">

                      <p>Dear ${req.body.name},</p>

                            <p>
                                Thank you for reaching out to <b>Primecon Construction .</b> We appreciate
                                your interest in our services and the opportunity to discuss your
                                construction needs.
                            </p>

                            <p>
                                We have received your message and will review it promptly. Our team
                                is dedicated to providing exceptional customer service and we will
                                do our best to respond to you at the earliest possible time.
                            </p>

                            <p>
                                If you have any further questions or concerns, please do not
                                hesitate to contact us. We are always available to assist you with
                                your construction needs.
                            </p>

                            <p>
                                Thank you once again for considering Primecon Construction for your
                                project. We look forward to the opportunity to work with you.
                            </p>

                            <p>
                                Best regards,<br />
                                Primecon
                            </p>
                  </td>
              </tr>

              <!-- fotter  -->
              <tr>
                  <td class="footer">
                      <p>
                          Please note that the email you have received is generated automatically by our system.
                      </p>
                      <img class="footerLogo"
                                src="https://firebasestorage.googleapis.com/v0/b/primecon-7629b.appspot.com/o/icon2.png?alt=media&token=c14cdb8f-18f7-46f7-9174-5964cd372e4e"
                                width="79px" height="26.7px">
                  </td>
              </tr>

          </table>
      </center>
  </body>
      `, // html body
    };
    var mailOptions2 = {
      from: "info@primecon.ca", // sender address
      to: `${process.env.PRIMECON_EMAIL}`, // list of receivers
      subject: "User Visit On PRIMECON", // Subject line
      html: `<!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>

      </head>

      <body>
          <table>
              <thead>
                  <tr>
                     <b> Visited User Details </b>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td> Name</td>
                      <td>${req.body.name}</td>
                  </tr>
                  <tr>
                      <td> Email</td>
                      <td>${req.body.email}</td>
                  </tr>
                  <tr>
                      <td> MobileNo</td>
                      <td>${req.body.phone}</td>
                  </tr>
                  <tr>
                      <td> Post Code</td>
                      <td>${req.body.pinCode}</td>
                  </tr>
                  <tr>
                      <td> Message</td>
                      <td>${req.body.message}</td>

                  </tr>
                  <tr>
                      <td> Files</td>
                      <td> ${req.body.files}</td>
                  </tr>

              </tbody>
          </table>
      </body>

      </html>`, // html body
    };
    var arr = [mailOptions1, mailOptions2];
    // var arr = [mailOptions1];
    if (!saveUser) {
      const obj = {
        res,
        status: Constant.STATUS_CODE.BAD_REQUEST,
        msg: Constant.ERROR_MSGS.CREATE_ERR,
      };
      return Response.error(obj);
    } else {
      var abc = arr.map(async (mail) => {
        transporter.sendMail(mail, (err, result) => {
          if (result) {
            console.log("Email Sent Successfully!! ......", result);
          } else {
            console.log("err .....", err);
          }
        });
        //  await transporter.sendMail(mail);
      });
      // transporter.sendMail(mailOptions1, function (err, result) {
      //   if (result) {
      //     console.log("User Email Sent Successfully!! ......");
      //   } else {
      //     console.log("err .....", err);
      //   }
      // });

      // transporter.sendMail(mailOptions2, function (err, result) {
      //   if (result) {
      //     console.log("Admin Email Sent Successfully!! ......");
      //   } else {
      //     console.log("err .....", err);
      //   }
      // });
      // console.log("info2", info2);
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

const uploadFile = async (req, res) => {
  const { logger } = req;
  try {
    var arr = [];
    var data;
    //firebase logic to upload the image
    var imageData = req.files.image;
    // console.log("imageData---->", imageData.length);
    if (imageData.length == undefined) {
      const image = req.files.image.filepath;
      console.log("image", image);
      let uploaded = bucket.upload(image, {
        public: true,
        destination: `images/${
          Math.random() * 10000 + req.files.image.originalFilename
        }`,
        // destination:image.filename,
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
      });
      data = await uploaded;
      arr.push(data[0].metadata.mediaLink);
    } else {
      for (let i = 0; i < imageData.length; i++) {
        // console.log("req.files.image--->", req.files.image[0]);
        const image = req.files.image[i].filepath;
        console.log("image", image);
        // console.log("image");
        let uploaded = bucket.upload(image, {
          public: true,
          destination: `images/${
            Math.random() * 10000 + req.files.image[i].originalFilename
          }`,
          // destination:image.filename,
          metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
          },
        });
        data = await uploaded;
        arr.push(data[0].metadata.mediaLink);
        // console.log("data ..............", data);
      }
    }

    console.log(arr);
    if (arr.length == 0) {
      const obj = {
        res,
        status: Constant.STATUS_CODE.BAD_REQUEST,
        msg: Constant.ERROR_MSGS.CREATE_ERR,
      };
      return Response.error(obj);
    } else {
      const obj = {
        res,
        msg: Constant.INFO_MSGS.CREATED_SUCCESSFULLY,
        status: Constant.STATUS_CODE.OK,
        // data: data[0].metadata.mediaLink,
        data: arr,
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
  uploadFile,
};
