import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios'; // You might need to mock axios

// Mock axios for testing
jest.mock('axios');

describe('AppliedJobs Component', () => {
  it('should render without errors', () => {
    jest.mock('../../../Components/Freelancer/AppliedJobs',()=>'AppliedJobs');
  });

});