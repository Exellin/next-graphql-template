const { printSchema } = require('graphql');

module.exports = {
  plugin: (schema) => {
    const printedSchema = printSchema(schema);

    return printedSchema;
  },
};
