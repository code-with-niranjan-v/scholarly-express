import UserModel from "../model/UserModel.js";
import crypto from "node:crypto";
import { generateToken } from "../utils/generateToken.js";
class UserController {
  registerUser(req, res) {
    try {
      let requestBody = req.body;
      let getPassword = crypto
        .createHash("md5")
        .update(requestBody.password)
        .digest("hex");
      let userData = {
        name: requestBody.name,
        role: requestBody.role,
        department: requestBody.department,
        id: requestBody.id,
        email: requestBody.email,
        password: getPassword,
      };
      UserModel.insertUser(userData);
      res.send({ status: "Success" });
    } catch (e) {
      res.send({ status: "Failed", error: e });
    }
  }

  async login(req, res) {
    try {
      let requestBody = req.body;
      let getPassword = crypto
        .createHash("md5")
        .update(requestBody.password)
        .digest("hex");
      let userData = {
        email: requestBody.email,
        password: getPassword,
      };
      let user = await UserModel.findByQueries(userData);
      if (user) {
        let token = generateToken(user);
        res.send({
          status: "Success",
          token: token,
          uid: user.id,
          role: user.role,
        });
        console.log(user);
      } else {
        res.send({ status: "Failed", message: "User Not Found" });
      }
    } catch (e) {
      res.send({ status: "Failed", message: e.message });
    }
  }

  async getAllStudents(req, res) {
    try {
      const query = { role: "STUDENT" };
      let student = await UserModel.findsByQueries(query);
      res.send({
        status: "Success",
        data: student,
      });
    } catch (e) {
      res.send({ status: "Failed", message: e.message });
    }
  }
}

export default new UserController();
