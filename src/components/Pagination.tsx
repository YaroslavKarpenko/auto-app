import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPage } from '../store/filter/slice';

import { Pagination as Pag } from '@mui/material';

import { LoadingStatus } from '../store/ad/slice';
import { selectPage } from '../store/filter/selectors';
import { selectAdList, selectLoadingStatus, selectTotalAds } from '../store/ad/selectors';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();

  const totalAds = useAppSelector(selectTotalAds);
  const currentPage = useAppSelector(selectPage);
  const adsList = useAppSelector(selectAdList);
  const loadingStatus = useAppSelector(selectLoadingStatus);

  const pageCount = Math.ceil(totalAds / 5);
  return (
    <div
      className={`${
        loadingStatus === LoadingStatus.FULFILLED && adsList.length === 0 ? 'hidden' : 'flex'
      }  flex-row items-center justify-center mt-10`}>
      <Pag
        variant="outlined"
        color="standard"
        shape="rounded"
        count={pageCount}
        page={currentPage}
        onChange={(_, num) => dispatch(setPage(num))}
        siblingCount={1}
        sx={{ '& .MuiPagination-root': {} }}
      />
    </div>
  );
};

export default Pagination;
