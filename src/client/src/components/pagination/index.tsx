import React from 'react';
import { Pagination as PaginationComponent } from 'antd';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePagenation: (page: number) => void;
}

/* Pagination component controlled by parent component */

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  handlePagenation,
  currentPage,
}: PaginationProps) => (
  <PaginationComponent
    style={{ margin: '50px 0' }}
    current={currentPage}
    onChange={(currentPage) => handlePagenation(currentPage)}
    total={totalPages}
  />
);
export default Pagination;
