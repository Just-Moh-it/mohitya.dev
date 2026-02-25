import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <div>
      <h1 className="text-3xl font-bold mb-4">Post not found</h1>
      <p className="text-muted-foreground mb-4">
        The blog post you're looking for doesn't exist.
      </p>
      <Link
        to="/blog"
        className="font-mono text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; back to blog
      </Link>
    </div>
  ),
});
