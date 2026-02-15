import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function ArticleDetailsScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h3 fw-bold mb-3">Article</h1>
        <p className="text-muted mb-4">No article selected. Please open an article from the Articles page.</p>
        <Button variant="primary" onClick={() => navigate('/articles')}>Go to Articles</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <article className="mx-auto" style={{ maxWidth: '840px' }}>
        <h1 className="display-5 fw-bold mb-3">{article.titleofBlog}</h1>
        <p className="text-muted mb-4">{new Date(article.dateofBlog).toLocaleDateString()}</p>
        <p className="lead">{article.contentofBlog}</p>
      </article>
    </Container>
  );
}

export default ArticleDetailsScreen;
