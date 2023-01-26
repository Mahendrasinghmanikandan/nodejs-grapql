const User = require("../../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const resolvers = {
        Query: {
                authUser: async (_, args, context) => {
                        const { email, password } = args.loginDetails;
                        const validateUser = await User.findOne({ email: email });
                        if (!validateUser) {
                                return "user not found"
                        } else if (await bcrypt.compare(password, validateUser.password) === false) {
                                return "invalid password"
                        } else {
                                const token = jwt.sign({ id: validateUser._id, email: email }, "rock", { expiresIn: "2h" });
                                return validateUser._id;
                        }

                },

        },
        Mutation: {
                registerUser: async (_, args) => {
                        let { email, password } = args.input;
                        const encryptedPassword = await bcrypt.hash(password, 10);
                        const user = new User({
                                email, password: encryptedPassword
                        })
                        await user.save();
                        return args.input;
                }
        }
}

module.exports = resolvers;