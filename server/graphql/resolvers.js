import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    projects: async () => await Project.find(),
    project: async (_, { _id }) => await Project.findById(_id),
    tasks: async () => await Task.find(),
    task: async (_, { _id }) => await Task.findById(_id),
    user: async (_, { _id }) => await User.findById(_id),
  },
  Mutation: {
    registerUser: async (
      _,
      { registerInput: { username, email, password } }
    ) => {
      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new GraphQLError(
          "An user is already registered with the email" + email,
          "USER_ALREADY_REGISTERED"
        );
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        {
          user_id: newUser._id,
          email,
        },
        "UNSAFE_STRING",
        { expiresIn: "2h" }
      );
      newUser.token = token;

      const response = await newUser.save();

      return {
        id: response.id,
        ...response._doc,
      };
    },
    loginUser: async (_, { loginInput: { email, password } }) => {
      const user = await User.findOne({ email }).lean();
      if (!user) {
        throw new GraphQLError("User does not exist", "INCORRECT_USER");
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
          },
          "UNSAFE_STRING",
          { expiresIn: "2h" }
        );
        user.token = token;

        return {
          id: user._id,
          ...user,
        };
      }
      throw new GraphQLError("Incorrect password", "INCORRECT_PASSWORD");
    },
    createProject: async (_, { name, description }) => {
      const project = new Project({
        name,
        description,
      });
      const savedProject = await project.save();
      return savedProject;
    },
    createTask: async (_, { title, projectId }) => {
      const projectFound = await Project.findById(projectId);
      if (!projectFound) throw new Error("Project not found");
      const task = new Task({
        title,
        projectId,
      });
      const savedTask = await task.save();
      return savedTask;
    },
    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject) throw new Error("Project not found");
      await Task.deleteMany({ projectId: deletedProject._id });
      return deletedProject;
    },
    deleteTask: async (_, { _id }) => {
      const deletedTask = await Task.findByIdAndDelete(_id);
      if (!deletedTask) throw new Error("Task not found");
      return deletedTask;
    },
    updateTask: async (_, args) => {
      const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedTask) throw new Error("Task not found");
      return updatedTask;
    },
    updateProject: async (_, args) => {
      const updatedProject = await Project.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedProject) throw new Error("Project not found");
      return updatedProject;
    },
  },
  Project: {
    tasks: async (parent) => await Task.find({ projectId: parent._id }),
  },
  Task: {
    project: async (parent) => await Project.findById(parent.projectId),
  },
};
