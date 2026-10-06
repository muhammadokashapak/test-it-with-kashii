const testRunSchema = require('./schemas/test-run.schema.json');
const actionSchema = require('./schemas/action.schema.json');
const evidenceSchema = require('./schemas/evidence.schema.json');
const assertionSchema = require('./schemas/assertion.schema.json');
const findingSchema = require('./schemas/finding.schema.json');
const agentToolSchema = require('./schemas/agent-tool.schema.json');
const healthSchema = require('./schemas/health.schema.json');

module.exports = {
  testRunSchema,
  actionSchema,
  evidenceSchema,
  assertionSchema,
  findingSchema,
  agentToolSchema,
  healthSchema,
};

if (require.main === module) {
  console.log('✅ @kashii/contracts: All schemas loaded successfully.');
}
