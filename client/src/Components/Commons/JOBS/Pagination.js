import {
    Button,
    Typography,
  } from "@mui/material";

const Pagination = ({ jobsPerPage, totalJobs, paginate, currentPage,setCurrentPage }) => {
    const totalPages = Math.ceil(totalJobs / jobsPerPage);
  
    return (
      <nav>
        <ul style={{ listStyleType: "none", padding: 0, display: "flex", justifyContent: "center" }}>
          {/* Previous Button */}
          <li style={{ marginRight: "10px" }}>
            <Button variant="contained" color="primary" onClick={() => {
              if (currentPage > 1) {
                //paginate(currentPage - 1); // Decrement the current page
                setCurrentPage(currentPage - 1);
              }
            }}
            disabled={currentPage === 1}
            >
              Previous
            </Button>
          </li>
          {/* Page Number */}
          <li style={{ marginRight: "10px" }}>
            <Typography variant="body1">
            {totalJobs === 0 ? 
                "0 of 0" : 
                `Page ${currentPage} of ${totalPages}`
              }
            </Typography>
          </li>
          {/* Next Button */}
          <li style={{ marginRight: "10px" }}>
            <Button variant="contained" color="primary" onClick={() => {
              if (currentPage < totalPages) {
                //paginate(currentPage + 1); // Increment the current page
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages || totalJobs === 0}
            >
              Next
            </Button>
          </li>
        </ul>
      </nav>
    );
  };
  export default Pagination;

