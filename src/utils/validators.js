export function validatePost({
  title,
  author,
  content,
  tags,
}) {
  const errors = {};

  if (!title.trim()) {
    errors.title = "Title is required.";
  }

  if (!author.trim()) {
    errors.author = "Author is required.";
  }

  if (!content.trim()) {
    errors.content = "Content is required.";
  } else if (content.trim().length < 20) {
    errors.content =
      "Content must be at least 20 characters long.";
  }

  if (!tags.trim()) {
    errors.tags = "Please enter at least one tag.";
  }

  return errors;
}