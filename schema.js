const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    publicationDate: String!
    user: User!
  }

  type LiveScore {
    id: ID!
    name: String!
    matchType: String!
    status: String!
    venue: String!
    date: String!
    dateTimeGMT: String!
    teams: [String!]!
    score: [Score!]!
    series_id: String!
    fantasyEnabled: Boolean!
    bbbEnabled: Boolean!
    hasSquad: Boolean!
    matchStarted: Boolean!
    matchEnded: Boolean!
  }

  type Score {
    r: Int!
    w: Int!
    o: Float!
    inning: String!
  }

  type Player {
    id: ID!
    name: String!
    country: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    articles: [Article]
    article(id: ID!): Article
    liveScores: [LiveScore]
    players: [Player]
    homePageData: HomePageData
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, role: String!): User
    login(email: String!, password: String!): String
    createArticle(title: String!, content: String!, userId: ID!): Article
    updateArticle(id: ID!, title: String!, content: String!): Article
    deleteArticle(id: ID!): Boolean
    likeArticle(articleId: ID!): Boolean
  }

  type HomePageData {
    articles: [Article]
    liveScores: [LiveScore]
    players: [Player]
  }
`;

module.exports = typeDefs;