const pipelinePagination = ({ page = 1, pageSize = 100, sortBy = '_id', order = 1 }) => {
  const orderToUse = order !== 1 && order !== -1 ? 1 : order;
  const pageSizeToUse = pageSize % 1 === 0 ? pageSize : 100;
  const pageToUse = page % 1 === 0 ? page : 1;
  return [
    // Sort by _id
    {
      $sort: { [sortBy]: orderToUse }
    },
    // Group to get count of relevant without losing results
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        results: { $push: '$$ROOT' }
      }
    },
    // Apply skip and limit to results
    {
      $project: {
        _id: 0,
        count: 1,
        results: { $slice: ['$results', pageSizeToUse * (pageToUse - 1), pageSizeToUse] }
      }
    }
  ];
}

module.exports = pipelinePagination;