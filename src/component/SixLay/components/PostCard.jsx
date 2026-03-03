import React from 'react';
import '../App.css';

const PostBugs = ({ bugs }) => {
  const { title, author, likes, category, isPopular } = bugs
  const categoryIcons = {
    Bug: '🐞'
  }

  return (
    <article className={`post-card ${isPopular ? 'popular' : ''}`}>
      <div className="post-category">
        <span className="category-icon">
          {categoryIcons[category] || '📌'}
        </span>
        <span className="category-name">{category}</span>

      </div>

      <h3 className="post-title">{title}</h3>

      <div className="post-footer">
        <span className="post-author">By {author}</span>

        <div className="post-likes">
          <span className="likes-icon">❤️</span>
          <span className="likes-count">{likes}</span>
        </div>
      </div>

      {isPopular && (
        <div className="popular-badge">
          🔥 Popular
        </div>
      )}
    </article>
  )
}

export default PostBugs