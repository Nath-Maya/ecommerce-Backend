import GitHubStrategy from "passport-github2";
import UserService from "../../services/user.service.js";
import UserRepository from "../../dao/repository/user.repository.js";

const userService = new UserService(new UserRepository());
const { ENV_STAGE, PORT, APP_URL, RAILWAY_PUBLIC_DOMAIN } = process.env;
const HTTPS_RAILWAY_PUBLIC_DOMAIN = RAILWAY_PUBLIC_DOMAIN? `https://${RAILWAY_PUBLIC_DOMAIN}`: null;

const ghCallbackURL =
  (ENV_STAGE === "PROD"
    ? HTTPS_RAILWAY_PUBLIC_DOMAIN || APP_URL
    : "http://localhost:" + (PORT || 8080)) + "/api/sessions/github/callback";

export default (clientID, clientSecret) =>
  new GitHubStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: ghCallbackURL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile._json.email ?? profile.emails[0].value;
      try {
        let user = await userService.findUserByCriteria({
          email,
        });
        if (!user) {
          let newUser = {
            firstName: profile._json.name,
            lastName: "",
            birthday: "",
            email,
            password: "",
            role: "user",
          };
          await userService.createUser(newUser);
          done(null, {
            name: newUser.firstName + " " + newUser.lastName,
            ...newUser,
          });
        } else {
   
          const { password, ...rest } = user;
          done(null, {
            name: user.firstName + " " + user.lastName,
            ...rest,
            role: "user",
          });
        }
      } catch (err) {
        return done(err);
      }
    }
  );