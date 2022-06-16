import { intArg, list, nonNull, objectType, stringArg } from "nexus";
import { extendType } from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("body");
    t.boolean("published");
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("drafts", {
      type: nonNull(list(Post)),
      resolve(_root, _args, ctx) {
        // 1
        return ctx.db.post.findMany({ where: { published: false } });
      },
    });
    t.list.field("posts", {
      type: "Post",
      resolve(_root, _args, ctx) {
        return ctx.db.post.findMany({ where: { published: true } });
      },
    });
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createDraft", {
      type: Post,
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        const draft = {
          title: args.title,
          body: args.body,
          published: false,
        };
        return ctx.db.post.create({ data: draft });
      },
    });
    t.nonNull.field("deletePost", {
      type: Post,
      args: {
        postId: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        const p = await ctx.db.post.findMany({
          where: { id: args.postId },
        });
        if (p.length) {
          return ctx.db.post.delete({ where: { id: args.postId } });
        }
        throw Error(`Post with id: ${args.postId} ${p} does not exist`);
      },
    });
    t.field("publish", {
      type: Post,
      args: {
        draftId: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.post.update({
          where: { id: args.draftId },
          data: {
            published: true,
          },
        });
      },
    });
  },
});
