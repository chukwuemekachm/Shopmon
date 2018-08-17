const mailTemplates = {
  accountVerification: (username, link) => (
    `
    <h3>Welcome to Shopmon</h3>
    <br>
    <p>Hi ${username},</p>
    <p>Your account is almost ready, please click the button below to activate your account.<p>
    <br>
    <p><a href="${link}" style="padding: 12px 10px; background-color: #1E8BC3; color: white; text-decoration: none; border-radius: 1px;">
    Confirm Email Address
    </a></p>
    <br>
    Thanks.`),
};

export default mailTemplates;
