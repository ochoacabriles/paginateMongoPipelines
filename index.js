const pipelinePagination = ({ page, pageSize, sortBy }) =>
[
  // Sort by _id
  {
    $sort: { [sortBy]: 1 }
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
      results: { $slice: ['$results', pageSize * (page - 1), pageSize] }
    }
  }
];

module.exports = pipelinePagination;