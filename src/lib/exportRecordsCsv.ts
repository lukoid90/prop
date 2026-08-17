import { LISTING_EVENTS, MORTGAGE_EVENTS, TAX_YEARS } from '../components/RecordsSection'

function csvCell(value: string | number) {
  const s = String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function csvRow(cells: (string | number)[]) {
  return cells.map(csvCell).join(',')
}

export function buildRecordsCsv() {
  const lines = [csvRow(['Section', 'Year', 'Date', 'Event / Field', 'Amount', 'Detail', 'Trend', 'Source / Lender', 'Lien'])]

  for (const e of LISTING_EVENTS) {
    lines.push(csvRow(['Listing', e.year, e.date, e.eventLabel, e.price, `${e.perSqFt} per ft²`, e.trend, e.source, '']))
  }
  for (const t of TAX_YEARS) {
    lines.push(csvRow(['Tax Record', t.year, '', 'Property tax', t.propertyTax, '', t.propertyTaxTrend, '', '']))
    lines.push(csvRow(['Tax Record', t.year, '', 'Land + Additions', `${t.land} + ${t.additions}`, '', '', '', '']))
    lines.push(csvRow(['Tax Record', t.year, '', 'Tax assessment', t.assessedValue, '', t.assessedValueTrend, '', '']))
  }
  for (const m of MORTGAGE_EVENTS) {
    lines.push(csvRow(['Mortgage', m.year, m.date, m.type, m.loanAmount, m.term, '', m.lender, m.lien]))
    lines.push(csvRow(['Mortgage', m.year, m.date, `${m.type} rate`, `${m.rate} ${m.rateType}`, '', '', m.lender, m.lien]))
  }

  return lines.join('\n')
}

export function downloadRecordsCsv() {
  const csv = buildRecordsCsv()
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = '780-correa-way-records.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
