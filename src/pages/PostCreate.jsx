import { useState, useEffect } from "react";
import Header from "../components/Header";
import { validatePost } from "../utils/validators";
import { toast } from "react-toastify";

function PostCreate() {
  const savedDraft = JSON.parse(localStorage.getItem("postDraft"));

  const [title, setTitle] = useState(savedDraft?.title || "");
  const [author, setAuthor] = useState(savedDraft?.author || "");
  const [content, setContent] = useState(savedDraft?.content || "");
  const [tags, setTags] = useState(savedDraft?.tags || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem(
      "postDraft",
      JSON.stringify({
        title,
        author,
        content,
        tags,
      })
    );
  }, [title, author, content, tags]);

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

    const currentTime = new Date().toLocaleString();

    const newPost = {
      id: Date.now(),
      title,
      author,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    const storedPosts =
      JSON.parse(localStorage.getItem("posts")) || [];

    storedPosts.push(newPost);

    localStorage.setItem(
      "posts",
      JSON.stringify(storedPosts)
    );

    toast.success("Content published successfully!");

    localStorage.removeItem("postDraft");

    setTitle("");
    setAuthor("");
    setContent("");
    setTags("");
  };

  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-danger">
            Create Content
          </h1>

          <p className="text-muted">
            Add the required information to publish a new article.
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
                      placeholder="technology, design, coding"
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
                      className="btn btn-danger px-5 rounded-pill"
                    >
                      Publish
                    </button>

                    <button
                      type="reset"
                      className="btn btn-outline-dark px-5 rounded-pill"
                      onClick={() => {
                        setTitle("");
                        setAuthor("");
                        setContent("");
                        setTags("");
                      }}
                    >
                     🔃 Reset
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

export default PostCreate;