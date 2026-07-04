import Header from "../components/Header";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  const selectedPost = storedPosts.find(
    (post) => post.id.toString() === id
  );

  if (!selectedPost) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <h2>Content Not Found</h2>
        </div>
      </>
    );
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Do you want to remove this content?"
    );

    if (!confirmDelete) return;

    const remainingPosts = storedPosts.filter(
      (post) => post.id.toString() !== id
    );

    localStorage.setItem("posts", JSON.stringify(remainingPosts));

    toast.success("Content removed successfully!");

    navigate("/");
  };

  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body p-5">
                <h1 className="display-5 fw-bold text-danger mb-4">
                  {selectedPost.title}
                </h1>

                <div className="d-flex flex-wrap gap-3 mb-4">
                  <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">
                    {selectedPost.author}
                  </span>

                  <span className="badge bg-dark fs-6 px-3 py-2 rounded-pill">
                    Created: {selectedPost.createdAt}
                  </span>

                  {selectedPost.updatedAt && (
                    <span className="badge bg-secondary fs-6 px-3 py-2 rounded-pill">
                      Updated: {selectedPost.updatedAt}
                    </span>
                  )}
                </div>

                <hr />

                <div
                  className="mt-4"
                  style={{
                    lineHeight: "1.9",
                    fontSize: "18px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedPost.content}
                </div>

                <div className="mt-5">
                  <h5 className="fw-bold mb-3">
                    Categories
                  </h5>

                  {selectedPost.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 me-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="d-flex justify-content-center gap-3 mt-5 flex-wrap">
                  <Link
                    to={`/posts/${selectedPost.id}/edit`}
                    className="btn btn-outline-danger rounded-pill px-4"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={handleDelete}
                    className="btn btn-danger rounded-pill px-4"
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-dark rounded-pill px-4"
                    onClick={() => window.history.back()}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostView;