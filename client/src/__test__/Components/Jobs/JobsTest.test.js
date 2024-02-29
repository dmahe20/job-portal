import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import JobTile from '../../../Components/Commons/JOBS/Jobs';
import Jobs from '../../../Components/Commons/JOBS/Jobs';

// Mock axios for testing
jest.mock('axios');

describe('JobTile Component', () => {

  it('should render without errors', () => {
    render(<Jobs />);
    render(<JobTile 
      job={{
        job_id: '123',
        job_title: 'Software Engineer',
        company_name: 'Example Company',
        jobDescription: 'Software development role',
        salary: '5000',
        applicants_userIds: ['applicant1', 'applicant2'],
        createdBy: 'user@example.com',
      }}
      />);
      const companyName = screen.getAllByLabelText(/ Search by Skill/i);
      fireEvent.change(companyName, {target:{value:"Example Company"}});
      expect(screen.queryByText(/error/i).toHaveTextContent('/error/'));
      expect(screen.getByText('job_title', { selector: 'h5' })).toBeInTheDocument();
      expect(screen.getByText('Company Name : Example Company')).toBeInTheDocument(); // Assert company name
      expect(screen.getByText('Role : Software development role')).toBeInTheDocument(); // Assert job description
      expect(screen.getByText('Salary : ₹ 5000 per month')).toBeInTheDocument(); // Assert salary
      expect(screen.getByText('Number of Applicants: 2')).toBeInTheDocument(); 
    
    });

  it('should render without errors', () => {
    jest.mock('../../../Components/Commons/JOBS/Jobs',()=>'Jobs');
  });

});