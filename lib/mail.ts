import { Resend } from "resend";

const resend = new Resend(process.env.RESENd_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  const t = await resend.emails.send({
    from: "workflowproject.g2@gmail.com",
    to: email,
    subject: "Confirm your email",
    html: `   <div style="background-color: #fff; padding: 20px; max-width: 600px; margin: 0 auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333;">Vérifiez votre adresse e-mail</h1>
        <p style="color: #555;">Merci de vous être inscrit ! Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse e-mail et compléter votre inscription.</p>
        <a href=${confirmLink} style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Vérifier mon e-mail</a>
        <p style="color: #777; margin-top: 20px;">Si vous n'avez pas créé de compte, vous pouvez ignorer cet e-mail.</p>
    </div>`,
  });
  console.log(t.data, t.error)
};
