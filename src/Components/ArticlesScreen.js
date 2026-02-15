import React from 'react';
import { useNavigate } from 'react-router-dom';
import Articles from './Articles';

function ArticlesScreen() {
  const navigate = useNavigate();
  const articles = [
    new Articles(
      "Title of a longer featured blog post",
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what is most interesting in this post's contents. This is sample article content that can later be replaced with real copy.",
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what is most interesting in this post's contents.",
      new Date()
    ),
  ];

  const featuredArticle = articles[0];

  return (
    <div className="p-4 p-md-5 mb-4 text-white bg-dark rounded">
      <div className="col-md-6 px-0">
        <h1 className="display-4 fst-italic">{featuredArticle.titleofBlog}</h1>
        <p className="lead my-3">{featuredArticle.shortenedDescription}</p>
        <p className="lead mb-0">
          <button
            type="button"
            className="btn btn-link p-0 text-white fw-bold text-decoration-none"
            onClick={() => navigate('/article-details', { state: { article: featuredArticle } })}
          >
            Read more...
          </button>
        </p>
      </div>
    </div>
  );
}

export default ArticlesScreen;