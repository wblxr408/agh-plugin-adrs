import { api } from './http.mjs'
import { options, schema, serve, string, tool } from './stdio.mjs'

const flags = options(process.argv.slice(2))
const request = api(flags.url, 'authorization', process.env.ADRS_TOKEN)
const root = '/api/v1/research'
const session = schema({ session_id: string(64) }, 'session_id')
function segment(value) {
  if (!/^[a-z0-9][a-z0-9_.:-]*$/i.test(value)) throw new Error('Invalid research identifier.')
  return encodeURIComponent(value)
}
const sessionPath = (id) => `${root}/${segment(id)}`
const tools = [
  tool('adrs_status', 'Read the current research status, including pending approvals.', session,
    ({ session_id }) => request(`${root}/status/${segment(session_id)}`)),
  tool('adrs_reports', 'List retained report versions for this research session.', session,
    ({ session_id }) => request(`${sessionPath(session_id)}/reports`)),
  tool('adrs_report', 'Read the selected report version with source citations.', schema({ session_id: string(64), report_id: string(120) }, 'session_id', 'report_id'),
    ({ session_id, report_id }) => request(`${sessionPath(session_id)}/reports/${segment(report_id)}`)),
  tool('adrs_evidence', 'Read source evidence from a research session.', schema({ session_id: string(64), evidence_id: string(120) }, 'session_id', 'evidence_id'),
    ({ session_id, evidence_id }) => request(`${sessionPath(session_id)}/evidence/${segment(evidence_id)}`)),
]
if (flags.allowWrites) {
  tools.push(tool('adrs_start', 'Start research on an owner-approved question. ADRS retains its own approvals.', schema({ query: string(2000, 5) }, 'query'),
    ({ query }) => request(root, { method: 'POST', body: { query: query.trim() } }), true))
}
await serve('adrs', tools)
