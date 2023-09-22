import { createTransport } from "nodemailer"


const TEST_MAIL = "aprendisdecoder@gmail.com";
const PASS = "jzfiofblqkoinpie"

const transporter = createTransport({
    host:"smtp.gmail.com",
    port: 587,
    auth:{
        user: TEST_MAIL,
        pass: PASS
    }  
});


const emailContent = {
    from: TEST_MAIL,
    to: "fer_bostero_91@hotmail.com",
    subject: "MODELO DE PRUEBA",
    
    html:"<div><h1 style= 'color: blue'  >contenido de prueba <span>node.js con nodemail</span><h1><img src='cid:perro'></div>",
    attachments:[
        {
        filename: "perro.jpg",
        path: "./perro.jpg",
        cid: "perro",
    },
    {
        path:"./Perrosygato.jpg"
    },
    ],
};
try{

 const info = await transporter.sendMail(emailContent)
 console.log(info)
} catch (error){
    console.log("error", error)

}










// export const sendRestoreEmail = async (restoreEmail) => {
// 	try {
// 		const emailContent = {
// 			from: TEST_MAIL,
// 			to: `${restoreEmail}`,
// 			subject: 'Create new password',
// 			html: `
// 			<div>
// 				<p>To create a new password, visit this link:</p>
// 				<a href="http://localhost:${PORT}/restore">Create new password</a>
// 				<p>The link expires in 1 hour</p>
// 			</div>
// 			`,
// 		};

// 		await transporter.sendMail(emailContent);
// 		return;
// 	} catch (error) {
// 		return `${error}`;
// 	}
// };

















