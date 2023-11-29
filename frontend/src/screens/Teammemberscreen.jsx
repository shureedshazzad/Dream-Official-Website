import React, { useState } from 'react';
import { useGetDonorsQuery } from '../slices/donorsApiSlice.js';

const Teammemberscreen = () => {
  const membersPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allDonorsData = [] } = useGetDonorsQuery();

  const textCenterStyle = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;

  // Filter committee members
  const committeeMembers = allDonorsData.filter((donor) => donor.isCommitteeMember);
  const currentMembers = committeeMembers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={textCenterStyle}
        >
          <h1>Executive Committee</h1>
        </div>
        <div className="row g-4">
          {currentMembers.map((donor) => (
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
              key={donor._id}
            >
              <div className="team-item position-relative rounded overflow-hidden">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={donor.committeeImage} alt={donor.name} />
                </div>
                <div className="team-text bg-light text-center p-4">
                  <h5>{donor.name}</h5>
                  <p className="text-primary">{donor.committeePost}</p>
                  <div className="team-social text-center">
                    <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(committeeMembers.length / membersPerPage) }).map(
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Teammemberscreen;
