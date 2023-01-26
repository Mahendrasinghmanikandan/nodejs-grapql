const Article = require("../../models/article.model");
const User = require("../../models/user.models");
const articleResolvers = {
        Query: {
                getAllArticle: async () => {
                        const articles = await Article.find().populate("authorId");
                        console.log(articles);
                        return articles;
                },
                getOneArticle: async (_, args) => {
                        const { id } = args;
                        const article = await Article.findById({ _id: id }).populate("authorId");
                        return article;
                },
                getMyArticle: async (_, args) => {
                        const { id } = args;
                        const article = await Article.find({ authorId: id });
                        return article;
                }
        },
        Mutation: {
                makeArticle: async (_, args) => {
                        const article = new Article(args.article);
                        await article.save();
                        return article;
                },
                updateArticle: async (_, args) => {
                        const { id, data } = args;
                        console.log(data)
                        await Article.findByIdAndUpdate({ _id: id }, { $set: data });
                        return "updated successfully"
                },
                deleteMyOneArticle: async (_, args) => {
                        const { id } = args;
                        await Article.deleteOne({ _id: id });
                        return "deleted successfully"
                },
                deleteMyAccount: async (_, args) => {
                        const { id } = args;
                        await User.deleteOne({ _id: id });
                        await Article.deleteMany({ authorId: id });
                        return "deleted successfully"
                },

        }
};


module.exports = articleResolvers;