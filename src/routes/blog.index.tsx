import { createFileRoute, Link } from "@tanstack/react-router";
import type { FileRoutesByTo } from "../routeTree.gen";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog - Mohit Yadav" },
      {
        name: "description",
        content:
          "Thoughts on building, hiring, and working on the internet.",
      },
      { property: "og:title", content: "Blog - Mohit Yadav" },
      {
        property: "og:description",
        content:
          "Thoughts on building, hiring, and working on the internet.",
      },
      { name: "twitter:title", content: "Blog - Mohit Yadav" },
      {
        name: "twitter:description",
        content:
          "Thoughts on building, hiring, and working on the internet.",
      },
    ],
  }),
  component: BlogPage,
});

const posts = [
  {
    slug: "leetcode-is-a-disqualifier",
    title: "Leetcode as a qualifier for startups",
    date: "2026-02-25",
    readingTime: "4 min read",
    description:
      "Why competitive programming filters out the best early-stage startup hires.",
  },
];

function BlogPage() {
  return (
    <div>
      <h1 className="text-3xl/snug font-bold mb-6">Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}` as keyof FileRoutesByTo}
            className="block group"
          >
            <p className="text-sm text-muted-foreground font-mono mb-1">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · {post.readingTime}
            </p>
            <h2 className="text-lg font-semibold group-hover:underline underline-offset-4 decoration-muted-foreground">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
