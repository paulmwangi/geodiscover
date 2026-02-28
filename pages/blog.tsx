import { useState } from 'react';
import { FaSearch, FaHeart, FaRegHeart, FaClock, FaUser, FaCalendarAlt, FaTag, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  image: string;
  eventType: string;
  readingTime?: number;
  tags?: string[];
  likes?: number;
}

const TAG_OPTIONS = ['Adventure', 'Nature', 'Culture', 'Sports', 'Music', 'Food', 'Travel', 'Technology'];

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

const initialFormData = {
  title: '',
  summary: '',
  author: '',
  date: '',
  image: '',
  eventType: '',
};

const Blog: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Exploring the Depths of the Ocean',
      summary: 'Join us as we dive into the mysteries of the deep sea. From bioluminescent creatures to ancient shipwrecks, discover the wonders that lie beneath the waves. This journey takes you through coral reefs, underwater caves, and the vast open ocean floor.',
      author: 'John Doe',
      date: '2023-01-01',
      image: '/img-1.png',
      eventType: 'Underwater Adventure',
      readingTime: 5,
      tags: ['Adventure', 'Nature', 'Travel'],
      likes: 24,
    },
    {
      id: '2',
      title: 'Scaling the World\'s Highest Peaks',
      summary: 'Experience the thrill and challenge of mountain climbing. From base camp preparations to the final summit push, learn what it takes to conquer the world\'s most iconic mountains. Hear stories from experienced climbers and discover essential gear tips.',
      author: 'Jane Smith',
      date: '2023-02-01',
      image: '/img-2.png',
      eventType: 'Mountain Expedition',
      readingTime: 7,
      tags: ['Adventure', 'Sports', 'Nature'],
      likes: 31,
    },
    {
      id: '3',
      title: 'The Future of Live Music Events',
      summary: 'How technology is transforming the concert experience. From augmented reality stage shows to AI-powered sound mixing, the future of live music is more immersive than ever. We explore what fans and artists can expect in the coming years.',
      author: 'Mike Chen',
      date: '2023-03-15',
      image: '/image1.jpg',
      eventType: 'Music & Culture',
      readingTime: 4,
      tags: ['Music', 'Technology', 'Culture'],
      likes: 18,
    },
    {
      id: '4',
      title: 'Street Food Around the World',
      summary: 'A culinary journey through the most vibrant street food scenes across the globe. From Bangkok\'s bustling night markets to Mexico City\'s taco stands, discover the flavors that define cultures and bring communities together.',
      author: 'Sarah Lee',
      date: '2023-04-20',
      image: '/image3.jpg',
      eventType: 'Food & Travel',
      readingTime: 6,
      tags: ['Food', 'Travel', 'Culture'],
      likes: 42,
    },
    {
      id: '5',
      title: 'Tokyo After Dark: Neon Nights and Hidden Bars',
      summary: 'Navigate Tokyo\'s labyrinth of backstreet izakayas, rooftop bars, and vibrant nightlife districts. From the electric streets of Shibuya to the tranquil whiskey bars of Ginza, discover the many faces of Tokyo after sunset.',
      author: 'Yuki Tanaka',
      date: '2023-05-10',
      image: '/image4.jpg',
      eventType: 'Nightlife & Culture',
      readingTime: 5,
      tags: ['Travel', 'Culture', 'Food'],
      likes: 36,
    },
    {
      id: '6',
      title: 'The Rise of Esports: From Hobby to Stadium',
      summary: 'Esports has evolved from basement LAN parties to filling 80,000-seat stadiums. We explore how competitive gaming became a billion-dollar industry, the training regimens of pro players, and what the future holds for digital athletes.',
      author: 'Alex Rivera',
      date: '2023-06-05',
      image: '/image5.jpg',
      eventType: 'Technology & Sports',
      readingTime: 8,
      tags: ['Technology', 'Sports', 'Culture'],
      likes: 55,
    },
    {
      id: '7',
      title: 'Safari Adventures: Witnessing the Great Migration',
      summary: 'Every year, millions of wildebeest cross the Serengeti in one of nature\'s most spectacular events. Learn how to plan the perfect safari, the best times to visit, and what it feels like to witness this awe-inspiring phenomenon firsthand.',
      author: 'Amara Okafor',
      date: '2023-07-12',
      image: '/image7.jpg',
      eventType: 'Wildlife & Nature',
      readingTime: 7,
      tags: ['Adventure', 'Nature', 'Travel'],
      likes: 48,
    },
    {
      id: '8',
      title: 'How Community Festivals Build Bridges',
      summary: 'From Diwali in India to Day of the Dead in Mexico, community festivals are powerful forces for connection. We look at how local celebrations foster understanding, preserve traditions, and bring diverse neighborhoods together.',
      author: 'Priya Sharma',
      date: '2023-08-20',
      image: '/image8.jpg',
      eventType: 'Culture & Community',
      readingTime: 6,
      tags: ['Culture', 'Travel', 'Music'],
      likes: 29,
    },
    {
      id: '9',
      title: 'Sustainable Travel: Events That Give Back',
      summary: 'A growing movement of eco-conscious events is changing how we travel. Discover volunteer tourism, beach cleanup festivals, and conservation-focused adventures that let you explore the world while making a positive impact.',
      author: 'Elena Rossi',
      date: '2023-09-15',
      image: '/image9.jpg',
      eventType: 'Eco Travel',
      readingTime: 5,
      tags: ['Travel', 'Nature', 'Adventure'],
      likes: 33,
    },
  ]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
    setBlogPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likes: (p.likes || 0) + (likedPosts.has(postId) ? -1 : 1) }
          : p
      )
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBlogPost: BlogPost = {
      id: String(Date.now()),
      ...formData,
      readingTime: estimateReadingTime(formData.summary),
      tags: selectedTags.length > 0 ? [...selectedTags] : ['Miscellaneous'],
      likes: 0,
    };

    setBlogPosts((prevPosts) => [newBlogPost, ...prevPosts]);
    setFormData(initialFormData);
    setSelectedTags([]);
    setShowForm(false);
  };

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !filterTag || post.tags?.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags || [])));

  const inputClasses =
    'w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-gray-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto py-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Our Blog</h1>
          <p className="text-lg text-primary-100 mb-8 max-w-xl mx-auto">
            Stories, tips, and inspiration for your next adventure. Stay up to date with the latest in events and exploration.
          </p>
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search blog posts"
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-base transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white" aria-label="Clear search">
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tag filter bar */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <FaTag className="text-gray-400 flex-shrink-0" size={14} />
          <button
            onClick={() => setFilterTag('')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${!filterTag ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(filterTag === tag ? '' : tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filterTag === tag ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {tag}
            </button>
          ))}
          <button
            onClick={() => setShowForm(!showForm)}
            className="ml-auto px-5 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-accent-500 to-accent-600 text-white whitespace-nowrap hover:shadow-md transition-all flex-shrink-0"
          >
            {showForm ? '✕ Close' : '✍️ Write Post'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Blog creation form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700/50 max-w-4xl mx-auto mb-10 space-y-5">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create a New Post</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="blog-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input id="blog-title" type="text" name="title" placeholder="Post title" value={formData.title} onChange={handleChange} required className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="blog-author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
                    <input id="blog-author" type="text" name="author" placeholder="Your name" value={formData.author} onChange={handleChange} required className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="blog-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                    <input id="blog-date" type="date" name="date" value={formData.date} onChange={handleChange} required className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="blog-eventType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <input id="blog-eventType" type="text" name="eventType" placeholder="e.g. Travel, Music" value={formData.eventType} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="blog-image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                    <input id="blog-image" type="url" name="image" placeholder="https://example.com/image.jpg" value={formData.image} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="blog-summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                    <textarea id="blog-summary" name="summary" rows={4} placeholder="Write your post content..." value={formData.summary} onChange={handleChange} required className={inputClasses} />
                  </div>
                </div>
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {TAG_OPTIONS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedTags.includes(tag) ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium transition-all text-sm shadow-md hover:shadow-lg"
                >
                  🚀 Publish Post
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
            {filterTag && <> tagged <span className="font-semibold text-gray-900 dark:text-white">{filterTag}</span></>}
          </p>
        </div>

        {/* Blog posts grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <FaSearch className="text-gray-300 dark:text-gray-600 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={searchQuery + filterTag}
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="relative overflow-hidden h-48">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                        <span className="text-5xl text-white/40">📝</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {post.eventType && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-primary-500 to-accent-500 shadow-sm">
                        {post.eventType}
                      </div>
                    )}
                    {post.readingTime && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white bg-black/40 backdrop-blur-md flex items-center gap-1">
                        <FaClock size={10} /> {post.readingTime} min
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/50">
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><FaUser size={10} /> {post.author}</span>
                        <span className="flex items-center gap-1"><FaCalendarAlt size={10} /> {post.date}</span>
                      </div>
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                        aria-label={likedPosts.has(post.id) ? 'Unlike' : 'Like'}
                      >
                        {likedPosts.has(post.id) ? <FaHeart className="text-red-500" size={14} /> : <FaRegHeart size={14} />}
                        <span>{post.likes || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
