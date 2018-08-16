const mailTemplates = {
  accountVerification: (username, link) => (
    `
    <h3>Welcome to Shopmon</h3>
    <br>
    <p>Hi ${username}</p>
    <p>Your account is almost ready, please click the button below to activate your account<p>
    <p><a href="${link}" style="padding: 12px 10px; background-color: blue; color: white">Confirm Email Address</a></p>
    <br>
    Thanks.`),
};

export default mailTemplates;
