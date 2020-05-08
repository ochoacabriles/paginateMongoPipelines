This package generates 3 final stages to get the results of an aggregation pipeline ready for pagination.

It receives an object with 4 parameters: 
  - pipeline: Array of Objects containing the stages for the pipeline before pagination (it's the only required param)
  - page: Int, defaults to 1 
  - pageSize: Int, defaults to 100 
  - sortBy: String, contains the name of the param to use to sorting, defaults to _id
  - order: 1 for ascending and -1 for descending and defaults to 1

Installation: `yarn add paginate-mongo-pipelines`

Usage:
```js
import pipelinePagination from 'paginate-mongo-pipelines';
// Import your mongoose model
import Model from 'models';

const pipeline = [
  // Put your cool pipeline stages in an array
];

const params = {
  pipeline,
  page: 1,
  pageSize: 100,
  sortBy: '_id',
  order: 1
};

Model.aggregate(pipelinePagination(params)).then((pipelineResults) => {
  // We need to do this to avoid an error if pipelinResults returns an empty array
  const { results, count } = pipelineResult.length === 0 ? { results: [], count: 0 } : pipelineResult[0];
  // Do something cool with your results
});
```