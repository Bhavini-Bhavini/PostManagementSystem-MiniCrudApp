import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4 post-card">
      <div className="card-body p-4">
        <h2 className="fw-bold text-danger mb-3">
          {post.title}
        </h2>

        <p className="text-muted mb-2">
          Written by <strong>{post.author}</strong>
        </p>

        <p className="text-dark">
          {post.content.length > 120
            ? `${post.content.substring(0, 120)}...`
            : post.content}
        </p>

        <div className="mb-3">
          {post.tags?.map((tag, index) => (
            <span
              key={index}
              className="badge bg-danger-subtle text-danger me-2 px-3 py-2 rounded-pill"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <small className="text-secondary">
            {post.createdAt}
          </small>

          <Link
            to={`/posts/${post.id}`}
            className="btn btn-danger rounded-pill px-4"
          >
            Read More ➡️
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;