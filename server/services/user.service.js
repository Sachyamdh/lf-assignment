const slugify = require("slugify");
const { prisma } = require("../config/db");
const AppError = require("../middleware/AppError");
const {
  hashing,
  generateEmailToken,
  comparePassword,
} = require("../utils/authUtils");
const { sendVerificationEmail } = require("../middleware/mailer");

class UserService {
  constructor() {
    if (!process.env.APP_URL) {
      throw new AppError(
        "Server Error",
        "APP_URL not set in environment variables",
        500
      );
    }
    this.url = process.env.APP_URL;
  }

  //get all users
  async getAllUsers() {
    const users = await prisma.user.findMany({
      where: { isVerified: true },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });
    return users;
  }

  //get user by email
  async getSingleUser(id) {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });
    if (!user) {
      throw new AppError("User not found", "User not found", 404);
    }
    return user;
  }

  //login function
  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        userName: true,
        password: true,
      },
    });

    if (!user) throw new AppError("User not found", "User not found", 404);
    // Check if the password is correct
    const isPasswordValid = await hashing(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", "Password is invalid", 401);
    }
    // Check if the user is verified
    return user;
  }

  //create user
  async registerUser(userData) {
    const { email, password, confirmPassword, ...data } = userData;
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError("User already exists", "Email already in use", 409);
    }

    // Hash the password
    const [hashedPassword, confirmHashedPassword] = await Promise.all([
      hashing(password),
      hashing(confirmPassword),
    ]);

    const verificationToken = await generateEmailToken();
    // Create the user
    try {
      const result = await prisma.$transaction(async (tx) => {
        //creating a transaction so that if any error occurs, the transaction will be rolled back
        //and the data will not be saved in the database
        //also to make sure users verify the email before creating the account
        const user = await tx.user.create({
          data: {
            ...data,
            email: email,
            password: hashedPassword,
            confirmPassword: confirmHashedPassword,
            token: verificationToken,
            isVerified: false,
          },
        });

        const mailData = {
          header: "Verify your email",
          subheader: "Please verify your email address",
          bodyText: "Click the button below to verify your email address",
          verificationUrl: `${this.url}/api/auth/veriry-user?token=${verificationToken}`,
        };
        const mailSent = await sendVerificationEmail(
          email,
          "Verify Your Email",
          "verify-email",
          mailData
        );
        if (!mailSent) {
          throw new AppError("Server Error", "Email not sent", 500);
        }

        //setTimeout to delete the user if not verified in 10 minutes
        // This is a simple way to handle unverified users, but in a production environment,
        //  might use a background job or cron job to handle this
        setTimeout(async () => {
          const foundUser = await prisma.user.findUnique({
            where: { id: user.id },
          });
          if (foundUser && !foundUser.isVerified) {
            await prisma.user.delete({ where: { id: user.id } });
            console.info(`Deleted unverified user: ${user.email}`);
          }
        }, 600000);

        return user;
      });
      return result;
    } catch (error) {
      throw new AppError(error.message, error.stack, error.status);
    }
  }

  //email verification
  async verifyEmail(token) {
    try {
      const user = await prisma.user.findUnique({
        where: { token },
        select: {
          id: true,
          email: true,
          userName: true,
          token: true,
          isVerified: true,
        },
      });
      // Check if the user was found
      if (!user) {
        throw new AppError(
          "Invalid or expired token",
          "Verification failed",
          400
        );
      }

      const data = await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          token: null,
        },
        select: {
          id: true,
          email: true,
          userName: true,
        },
      });

      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }

  async deleteUser(id, password) {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        password: true,
      },
    });
    if (!user) {
      throw new AppError("User not found", "User not found", 404);
    }
    console.log(password, user.password);
    // Check if the users password is valid
    const isPasswordValid = await comparePassword(password, user.password);

    // if password is not valid, throw an error
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", "Password is invalid", 401);
    }

    await prisma.user.delete({
      where: { id: id },
    });
    return true;
  }

  async updateUser(id, data) {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });
    if (!user) {
      throw new AppError("User not found", "User not found", 404);
    }
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        ...data,
      },
    });

    return updatedUser;
  }
}

module.exports = new UserService();
