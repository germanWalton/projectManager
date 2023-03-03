import { gql } from "graphql-tag";

export const typeDef = gql`
  type Query {
    hello: String
    projects: [Project]
    project(_id: ID!): Project
    task(_id: ID!): Task
    tasks: [Task]
  }

  type Mutation {
    createProject(name: String, description: String): Project
    deleteProject(_id: ID!): Project
    updateProject(_id: ID!, name: String!, description: String): Project
    createTask(title: String, projectId: ID): Task
    deleteTask(_id: ID!): Task
    updateTask(_id: ID!, title: String!, projectId: ID!): Task
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
`;
