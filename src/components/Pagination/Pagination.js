import React from "react";

function Pagination({ usersPerPage, totalUsers, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center ">
        <li className="page-item ">
          <a
            onClick={() => paginate(1)}
            className="page-link bg-dark"
            href="#"
          >
            First
          </a>
        </li>
        <li className="page-item">
          <a
            onClick={() => paginate(-1)}
            className="page-link bg-dark"
            href="#"
          >
            Previous
          </a>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={index} className="page-item">
            <a
              onClick={() => paginate(number)}
              className="page-link bg-dark"
              href="#"
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            onClick={() => paginate(6)}
            className="page-link bg-dark"
            href="#"
          >
            Next
          </a>
        </li>
        <li className="page-item">
          <a
            onClick={() => paginate(5)}
            className="page-link bg-dark"
            href="#"
          >
            Last
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
