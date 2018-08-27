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
  employeeAccountVerification: (email, password, link) => (
    `
    <h3>Welcome to Shopmon</h3>
    <br>
    <p>Hi dear,</p>
    <p>Your company's administrators have created an account for you with us. Please click the button below to activate your account.<p>
    <br>
    <p><a href="${link}" style="padding: 12px 10px; background-color: #1E8BC3; color: white; text-decoration: none; border-radius: 1px;">
    Activate account
    </a></p>
    <br>
    <p>Your login details are:</p>
    <p>Email: ${email}</p>
    <p>Password: ${password}</p>
    <p>Please endeavor to update your password after activating your account.</p>
    <br>
    Thanks.`),
};

export default mailTemplates;
