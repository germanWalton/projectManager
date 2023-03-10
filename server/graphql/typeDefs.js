import { gql } from "graphql-tag";

export const typeDef = gql`
  type Query {
    hello: String
    projects: [Project]
    project(_id: ID!): Project
    task(_id: ID!): Task
    tasks: [Task]
    user(_id: ID!): User
  }

  type Mutation {
    createProject(name: String, description: String): Project
    deleteProject(_id: ID!): Project
    updateProject(_id: ID!, name: String!, description: String): Project
    createTask(title: String, projectId: ID): Task
    deleteTask(_id: ID!): Task
    updateTask(_id: ID!, title: String!, projectId: ID!): Task
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    token: String
    createdAt: String
    updatedAt: String
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  type Task {
    _id: ID
    title: String
    project: Project
    updatedAt: String
    createdAt: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }
`;
