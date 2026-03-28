import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Calendar, User } from "lucide-react";

const SectionHeading = ({ title }) => {
  return (
    <div className="relative mb-16 text-left">
      <span className="heading-background-text left-[-20px] translate-x-0 uppercase">BLOGS</span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold relative z-10 leading-tight tracking-tight section-heading-teal-bar"
      >
        {title}<span style={{ color: 'var(--color-primary)' }}>.</span>
      </motion.h2>
    </div>
  );
};

export default function BlogsSection({ blogsRef }) {
  const blogs = [
    {
      id: 1,
      title: "Landing Your First Software Engineering Internship: A CS Student's Guide",
      excerpt: "Sharing my journey and tips on how to prepare for internships, build a portfolio, and ace technical interviews as a Computer Science student.",
      date: "March 20, 2024",
      author: "Sidhart Sami",
      readTime: "5 min read",
      tags: ["Career", "Internship", "CS Life"]
    },
    {
      id: 2,
      title: "Why Every Data Science Student Should Learn Web Development",
      excerpt: "Exploring the synergy between Data Science and Web Dev. How building interactive dashboards can help you showcase your ML models effectively.",
      date: "March 15, 2024",
      author: "Sidhart Sami",
      readTime: "4 min read",
      tags: ["Data Science", "Web Dev", "Learning"]
    },
    {
      id: 3,
      title: "Mastering Flutter: Tips for Building Performant Mobile Apps",
      excerpt: "Key takeaways from building WalkOver and Budsy. From state management to efficient UI rendering in Flutter and Dart.",
      date: "March 10, 2024",
      author: "Sidhart Sami",
      readTime: "6 min read",
      tags: ["Flutter", "Mobile Dev", "App Architecture"]
    }
  ];

  return (
    <section id="blogs" ref={blogsRef} className="scroll-mt-28 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Latest Articles" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-[var(--color-surface)] rounded-[2rem] border border-[var(--color-border)] overflow-hidden flex flex-col hover:border-[var(--color-primary)]/30 transition-all duration-500"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-primary)] border border-[var(--color-border)]">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                  {blog.title}
                </h3>

                <p className="text-sm text-[var(--color-text-muted)] mb-8 line-clamp-3 leading-relaxed font-light">
                  {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]/60">
                    <Calendar className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]/60">
                    {blog.readTime}
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 bg-[var(--color-surface-2)]/50 border-t border-[var(--color-border)] group-hover:bg-[var(--color-primary)]/5 transition-all duration-500">
                <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[var(--color-primary)] group-hover:gap-4 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
