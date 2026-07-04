import { Link } from "react-router-dom";

function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg shadow sticky-top"
      style={{ backgroundColor: "#8B0000" }}
    >
      <div className="container">
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3 text-white"
        >
          🗂️ Post Manager
        </Link>

        <div className="ms-auto d-flex gap-2">
          <Link
            to="/"
            className="btn btn-light rounded-pill px-4 fw-semibold"
          >
             📜Dashboard
          </Link>

          <Link
            to="/posts/new"
            className="btn btn-outline-light rounded-pill px-4 fw-semibold"
          >
             + Create Post
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;