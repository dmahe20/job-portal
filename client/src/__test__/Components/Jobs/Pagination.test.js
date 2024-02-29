import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../../../Components/Commons/JOBS/Pagination';
import '@testing-library/jest-dom/extend-expect'; // Import extend-expect for custom matchers

describe('Pagination Component', () => {
  let setCurrentPageMock;
  const currentPage = 2;
  const totalPages = 5;

  beforeEach(() => {
    setCurrentPageMock = jest.fn();
    render(
      <Pagination
        jobsPerPage={10}
        totalJobs={50}
        paginate={() => {}}
        currentPage={currentPage}
        setCurrentPage={setCurrentPageMock}
      />
    );
  });

  test('renders pagination correctly', () => {
    // Check if the page number is rendered correctly
    const pageNumberText = screen.getByText(`Page ${currentPage} of ${totalPages}`);
    expect(pageNumberText).toBeInTheDocument();
  });

  test('disables pagination buttons correctly', () => {
    // Mock the paginate function
    const paginateMock = jest.fn();

    // Render the Pagination component
    render(
        <Pagination
            jobsPerPage={10}
            totalJobs={20}
            paginate={paginateMock}
            currentPage={1} // currentPage is set to 1
        />
    );

    // Check if the Previous button is disabled
    const previousButtons = screen.getAllByText('Previous');
    previousButtons.forEach(button => {
        expect(button).toBeDisabled();
    });

    // Simulate click on Next button
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Check if the paginate function is called with the next page number
    expect(paginateMock).toHaveBeenCalledWith(2);
});

});
