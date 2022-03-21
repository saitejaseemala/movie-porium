import React from "react";
import "./Pagination.css";
import { Link } from "react-router-dom";

function Pagination({
  totalPages,
  pageChanger,
  activePage,
  onPageChange,
  decrementHandler,
  incrementHandler,
  type,
}) {
  const pageNumbers = [];
  if (totalPages > 10) {
    for (let i = pageChanger + 1; i < pageChanger + 11; i++) {
      if (i <= totalPages) {
        pageNumbers.push(i);
      } else {
        break;
      }
    }
  } else {
    for (let i = 1; i < totalPages + 1; i++) {
      pageNumbers.push(i);
    }
  }
  return (
    <div className="pagination-container">
      <ul className="pagination">
        {totalPages > 10 && pageChanger > 0 && (
          <li className="page-item" onClick={(e) => decrementHandler(e)}>
            <Link to={`/${type}?page=${pageChanger - 9}`} className="page-prev">
              &laquo;
            </Link>
          </li>
        )}
        {totalPages &&
          pageNumbers.map((pageNum) => {
            return (
              <li
                key={pageNum}
                className={`page-item ${
                  activePage === pageNum ? "active" : ""
                }`}
              >
                <Link
                  to={`/${type}?page=${pageNum}`}
                  className="page-link"
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </Link>
              </li>
            );
          })}
        {totalPages > 10 && pageChanger + 10 < totalPages && (
          <li className="page-item" onClick={(e) => incrementHandler(e)}>
            <Link
              to={`/${type}?page=${pageChanger + 11}`}
              className="page-next"
            >
              &raquo;
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
