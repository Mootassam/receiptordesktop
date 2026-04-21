import React, { useEffect, useState } from 'react';
import userActivityService from 'src/modules/userActivity/userActivityService';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';

function UserActivityPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const load = async (page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const offset = (page - 1) * pageSize;
      const response = await userActivityService.fetch(
        {},
        'timestamp_DESC',
        pageSize,
        offset,
      );
      setRows(response.rows || []);
      setPagination({
        current: page,
        pageSize,
        total: response.count || 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePagination = (nextPagination) => {
    load(nextPagination.current, nextPagination.pageSize);
  };

  const asIso = (v) => {
    if (!v) return '-';
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return '-';
    return d.toISOString();
  };

  return (
    <TableWrapper>
      <div className="table-responsive">
        <table className="table table-striped mt-2">
          <thead className="thead">
            <tr>
              <th>Email</th>
              <th>Action</th>
              <th>IP</th>
              <th>Country</th>
              <th>Device</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6}>
                  <Spinner />
                </td>
              </tr>
            )}
            {!loading && !rows.length && (
              <tr>
                <td colSpan={6}>
                  <div className="d-flex justify-content-center">No activity</div>
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((row: any) => (
                <tr key={row.id}>
                  <td>{row.email || row.user?.email || '-'}</td>
                  <td>{row.action || '-'}</td>
                  <td>{row.ipAddress || '-'}</td>
                  <td>{row.country || '-'}</td>
                  <td>{row.deviceStatus || '-'}</td>
                  <td>{asIso(row.timestamp || row.createdAt)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        onChange={onChangePagination}
        disabled={loading}
        pagination={pagination}
      />
    </TableWrapper>
  );
}

export default UserActivityPage;
