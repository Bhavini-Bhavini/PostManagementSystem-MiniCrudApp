import { useState, useEffect } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import useLocalStorage from "../hooks/useLocalStorage";
import seedPosts from "../data/seedPosts";

function PostList() {
  const [posts] = useLocalStorage("posts", seedPosts);
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 5;

  const uniqueTags = [...new Set(posts.flatMap((post) => post.tags))];
  const totalAuthors = new Set(posts.map((post) => post.author)).size;

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.author.toLowerCase().includes(searchText.toLowerCase());

      const matchesTag =
        selectedTag === "" || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    })
    .sort((firstPost, secondPost) => {
      switch (sortOption) {
        case "title":
          return firstPost.title.localeCompare(secondPost.title);

        case "oldest":
          return (
            new Date(firstPost.createdAt) - new Date(secondPost.createdAt)
          );

        default:
          return (
            new Date(secondPost.createdAt) - new Date(firstPost.createdAt)
          );
      }
    });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const visiblePosts = filteredPosts.slice(
    firstPostIndex,
    lastPostIndex
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedTag, sortOption]);

  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-3 fw-bold text-danger">
            🗂️ Post Manager
          </h1>

          <p className="text-muted fs-5">
            Organize, search, and manage your content with ease.
          </p>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center p-4">
              <h5 className="text-muted">Total Posts</h5>
              <h2 className="fw-bold text-danger">{posts.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center p-4">
              <h5 className="text-muted">Authors</h5>
              <h2 className="fw-bold text-dark">{totalAuthors}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center p-4">
              <h5 className="text-muted">Categories</h5>
              <h2 className="fw-bold text-secondary">
                {uniqueTags.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mb-5">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title or author..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <div className="col-lg-3">
                <select
                  className="form-select"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="">All Categories</option>

                  {uniqueTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-2">
                <select
                  className="form-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">A-Z</option>
                </select>
              </div>

              <div className="col-lg-2 d-grid">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setSearchText("");
                    setSelectedTag("");
                    setSortOption("latest");
                  }}
                >
                  🔃Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "70px" }}>📂</div>

            <h3>No Content Available</h3>

            <p className="text-muted">
              Adjust your search or filter options.
            </p>
          </div>
        ) : (
          <>
            {visiblePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default PostList;