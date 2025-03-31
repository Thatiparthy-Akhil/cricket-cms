const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getHomePageData, fetchLiveScores, fetchPlayers } = require('./services/articleService');
const { registerUser, getUserByEmail } = require('./models/user');
const { createArticle, updateArticle, deleteArticle, likeArticle, getAllArticles, getArticleById } = require('./models/article');

const resolvers = {
  Query: {
    users: async () => {
      // Fetch users from the database
    },
    user: async (_, { id }) => {
      return getUserData(id);
    },
    articles: async () => {
      return getAllArticles();
    },
    article: async (_, { id }) => {
      return getArticleData(id);
    },
    liveScores: async () => {
      const liveScores = await fetchLiveScores();
      return liveScores; // Ensure that fetchLiveScores returns an array
    },
    players: async () => {
      const players = await fetchPlayers();
      return players; // Ensure that fetchPlayers returns an array
    },
    homePageData: async () => {
      return getHomePageData();
    },
  },
  Mutation: {
    register: async (_, { name, email, password, role }) => {
      const userId = await registerUser(name, email, password, role);
      return { id: userId, name, email, role };
    },
    login: async (_, { email, password }) => {
      const user = await getUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
      }
      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );
      return accessToken;
    },
    createArticle: async (_, { title, content, userId }) => {
      const publicationDate = new Date().toISOString(); // Set the current date as publicationDate
      const articleId = await createArticle(title, content, userId);
      return { id: articleId, title, content, publicationDate, userId };
    },
    updateArticle: async (_, { id, title, content }) => {
      const existingArticle = await getArticleById(id);
      if (!existingArticle) {
        throw new Error('Article not found');
      }
      const updatedArticle = await updateArticle(id, title, content);
      return { id: updatedArticle.id, title: updatedArticle.title, content: updatedArticle.content};
    },
    deleteArticle: async (_, { id }) => {
      const deleted = await deleteArticle(id);
      return deleted;
    },
    likeArticle: async (_, { articleId } ) => {
      await likeArticle( articleId);
      return true;
    },
  },
};

module.exports = resolvers;