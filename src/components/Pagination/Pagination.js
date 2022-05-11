import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import { ReactComponent as IconArrowLeft } from 'components/icons/arrow-left.svg';
import { ReactComponent as IconArrowRight } from 'components/icons/arrow-right.svg';

import './Pagination.css';

export function Pagination({
  page, setPage, count, perPage,
}) {
  const pageCount = Math.ceil(count / perPage);

  return (
    <div className="paginate">
      <div className="paginate__count">
        {(page - 1) * perPage + 1}
        -
        {Math.min(page * perPage, count)}
        {' '}
        of&nbsp;
        {count}
        {' '}
        items
      </div>
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={perPage}
        onPageChange={(value) => {
          setPage(value.selected + 1);
        }}
        nextLabel={<IconArrowRight />}
        previousLabel={<IconArrowLeft />}
        breakLabel="..."
        renderOnZeroPageCount={null}
        className="pagination"
        pageLinkClassName="pagination__link"
        pageClassName="pagination__page"
        previousClassName="pagination__page_prev"
        nextClassName="pagination__page_next"
        previousLinkClassName="pagination__link_prev"
        nextLinkClassName="pagination__link_next"
        breakLinkClassName="pagination__break"
      />
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
