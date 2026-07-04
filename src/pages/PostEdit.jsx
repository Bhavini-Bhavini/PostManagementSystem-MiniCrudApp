import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { validatePost } from "../utils/validators";
import { toast } from "react-toastify";

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedPosts =
    JSON.parse(localStorage.getItem("posts")) || [];

  const selectedPost = storedPosts.find(
    (post) => post.id.toString() === id
  );

  const [title, setTitle] = useState(selectedPost?.title || "");
  const [author, setAuthor] = useState(selectedPost?.author || "");
  const [content, setContent] = useState(selectedPost?.content || "");
  const [tags, setTags] = useState(
    selectedPost?.tags?.join(", ") || ""
  );

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validatePost({
      title,
      author,
      content,
      tags,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const updatedPosts = storedPosts.map((post) =>
      post.id.toString() === id
        ? {
            ...post,
            title,
            author,
            content,
            tags: tags.split(",").map((tag) => tag.trim()),
            updatedAt: new Date().toLocaleString(),
          }
        : post
    );

    localStorage.setItem(
      "posts",
      JSON.stringify(updatedPosts)
    );

    toast.success("Content updated successfully!");

    navigate("/");
  };

  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-danger">
            Update Content
          </h1>

          <p className="text-muted">
            Modify the details and save your changes.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Title
                    </label>

                    <input
                      type="text"
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <div className="invalid-feedback">
                      {errors.title}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      📛Author Name
                    </label>

                    <input
                      type="text"
                      className={`form-control ${
                        errors.author ? "is-invalid" : ""
                      }`}
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />

                    <div className="invalid-feedback">
                      {errors.author}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      📔Description
                    </label>

                    <textarea
                      rows="6"
                      className={`form-control ${
                        errors.content ? "is-invalid" : ""
                      }`}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="invalid-feedback">
                      {errors.content}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      #️⃣Keywords
                    </label>

                    <input
                      type="text"
                      className={`form-control ${
                        errors.tags ? "is-invalid" : ""
                      }`}
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />

                    <div className="invalid-feedback">
                      {errors.tags}
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-danger px-5 rounded-pill fw-semibold"
                    >
                      ☑️Save Changes
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-dark px-5 rounded-pill"
                      onClick={() => navigate("/")}
                    >
                      ❌Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostEdit;