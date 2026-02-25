import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/leetcode-is-a-disqualifier")({
  head: () => ({
    meta: [
      { title: "Leetcode as a disqualifier for startups - Mohit Yadav" },
      {
        name: "description",
        content:
          "Why competitive programming filters out the best early-stage startup hires.",
      },
      { property: "og:title", content: "Leetcode as a disqualifier for startups" },
      {
        property: "og:description",
        content:
          "Why competitive programming filters out the best early-stage startup hires.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/og/leetcode-is-a-disqualifier.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Leetcode as a disqualifier for startups",
      },
      {
        name: "twitter:description",
        content:
          "Why competitive programming filters out the best early-stage startup hires.",
      },
      { name: "twitter:image", content: "/og/leetcode-is-a-disqualifier.png" },
    ],
  }),
  component: LeetcodeArticle,
});

function LeetcodeArticle() {
  return (
    <article>
      <header className="mb-8">
        <Link
          to="/blog"
          className="text-sm text-muted-foreground hover:text-foreground font-mono mb-4 inline-block"
        >
          &larr; back to blog
        </Link>
        <h1 className="text-3xl/snug font-bold mb-2">
          Leetcode as a disqualifier for startups
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          February 25, 2026 · 4 min read
        </p>
      </header>

      <div className="space-y-5 text-base/relaxed">
        <p>
          A few weeks ago I recommended an engineer to a friend&apos;s startup.
          Someone I&apos;d worked with, someone I was genuinely confident would
          be a godsend for a team their size. A day later I found out he was
          rejected before anyone even got on a call with him. The reason was
          leetcode.
        </p>

        <p>
          I ended up sending the founder a pretty passionate message about it.
          I genuinely want to see them win, and it felt like they were
          accidentally filtering out the exact people who would help them get
          there. This post is a cleaned up version of that message, because I
          think the idea applies well beyond one hiring process.
        </p>

        <p>
          Leetcode has been the secret handshake of tech hiring for over a
          decade. At a company like Google, it makes sense. You&apos;re sifting
          through hundreds of thousands of applicants and you need a proxy for
          general problem-solving ability. Someone who&apos;s gone through the
          effort of mastering competitive programming is probably high agency
          enough to pick up new problems quickly and grind through them. The
          signal is real. It works at scale.
        </p>

        <p>The problem is when two-person startups copy the playbook.</p>

        <p>
          Google&apos;s hiring constraint is volume. They&apos;re drowning in
          mediocre applicants with a few exceptional ones buried in the pile. The
          entire big tech industry collectively landed on competitive programming
          as a benchmark because it&apos;s sufficiently close to real engineering
          while being hard enough to learn that it filters well when you&apos;re
          processing thousands of candidates a month. A college degree works the
          same way. It&apos;s less about the knowledge and more about the signal
          that someone can push through a structured, long-term curriculum.
          Leetcode is that same kind of filter.
        </p>

        <p>
          And even that signal is eroding. AI and cheating tools have practically
          made leetcode a solved problem for interviews. Companies like Meta have
          already started moving away from it as a hiring metric because it no
          longer signals what it used to. The bar that was hard to clear five
          years ago is now something anyone with the right tooling can pass.
        </p>

        <p>
          Startups have fundamentally different constraints. You&apos;re not
          optimizing for eliminating people from a massive pool. You&apos;re
          trying to find the three or four people who will define the trajectory
          of your company. People who&apos;ve never wanted a big tech job or gone
          through the traditional CS pipeline will never have had the time or the
          need to get good at leetcode. Using it as a filter at a small company
          means you&apos;re mostly pulling from deeply patterned big tech people
          who are used to &ldquo;the ways,&rdquo; and those ways are rarely
          compatible with how you work when there are three of you in a room.
        </p>

        <p>
          What early-stage startups actually need are inspired people. Polyglots
          who are good at design, marketing, shipping, high agency across the
          board. The overlap between people who are great at leetcode and people
          who would work wonderfully as first hires at a startup is vanishingly
          small.
        </p>

        <p>
          I think a better approach is asking more generalized questions. Have
          them do a system design on the call. Ask them what they&apos;re{" "}
          <em>really impressive</em> at and let them set the tone of the
          conversation. Subpar engineers reveal themselves almost immediately in
          this format, so you still keep the filtering efficiency. The difference
          is what you&apos;re optimizing for. You&apos;re looking for the feeling
          of &ldquo;we really need this person on our team.&rdquo; And if you
          don&apos;t get that feeling from a candidate, given how consequential
          hiring is at this size, I&apos;d say don&apos;t hire at all. It is
          genuinely better to drown in work than to bring on someone you
          wouldn&apos;t cofound the company with, because at this stage
          that&apos;s effectively what you&apos;re doing.
        </p>

        <p>
          I recently recommended two engineers I&apos;ve worked with closely to a
          friend&apos;s startup. Both were filtered out before anyone even got on
          a call with them, purely because of leetcode scores. One of them has
          built systems from scratch that support ingesting millions of documents
          and hundreds of thousands of users. He&apos;s great at design, high
          agency, great to work with, has that rare combination of enthusiasm and
          willingness to learn. He was offered a founding engineering role at
          Million.js before deciding to go all in with me. The other internally
          built most of the infrastructure at his last company, think a vast
          subset of Cloudflare&apos;s offerings built with a scrappy Indian
          startup&apos;s go-to-market strategy. He&apos;s worked with distributed
          systems at levels most engineers would break under.
        </p>

        <p>
          Most startups would benefit massively from having someone like either
          of them.
        </p>

        <p>
          The question worth sitting with is: would any of your ideal candidates,
          the ones you&apos;d be genuinely thankful to have on your team, get
          disqualified by your current process? If the answer is yes, the process
          is costing you more than it&apos;s saving you.
        </p>
      </div>
    </article>
  );
}
