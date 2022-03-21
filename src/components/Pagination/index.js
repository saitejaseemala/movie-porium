import React from "react";
import "./Pagination.css";

function Pagination({
  totalPages,
  pageChanger,
  activePage,
  onPageChange,
  decrementHandler,
  incrementHandler,
}) {
  const pageNumbers = [];
  if (totalPages > 10) {
    for (let i = pageChanger + 1; i < pageChanger + 11; i++) {
      pageNumbers.push(i);
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
            <a href="#" className="page-prev">
              &laquo;
            </a>
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
                <a
                  href="#"
                  className="page-link"
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </a>
              </li>
            );
          })}
        {totalPages > 10 && pageChanger < totalPages && (
          <li className="page-item" onClick={(e) => incrementHandler(e)}>
            <a href="#" className="page-next">
              &raquo;
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
