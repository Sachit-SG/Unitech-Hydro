import type { SpecRow } from "@/lib/project-technical-data";
import {
  iwaSalientRows,
  upperPhawaSalientRows,
  upperPhawaSiteContext,
  upperPhawaStructureRows,
} from "@/lib/project-technical-data";

/** Full-width table within the page shell; caption and cells stay left-aligned. `table-fixed` keeps column widths even on large viewports. */
function SpecTable({
  caption,
  rows,
  "aria-label": ariaLabel,
}: {
  caption: string;
  rows: SpecRow[];
  "aria-label": string;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-[4px] border border-slate-200/80 bg-white shadow-sm">
      <table
        className="w-full min-w-[min(100%,520px)] table-fixed border-collapse text-left text-sm"
        aria-label={ariaLabel}
      >
        <caption className="border-b border-slate-200 bg-slate-50/95 px-4 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider text-brand-blue md:px-6">
          {caption}
        </caption>
        <colgroup>
          <col className="w-[34%] sm:w-[32%] md:w-[30%]" />
          <col className="w-[66%] sm:w-[68%] md:w-[70%]" />
        </colgroup>
        <tbody>
          {rows.map((row) => (
            <tr key={row.particular} className="border-b border-slate-100 last:border-0">
              <th
                scope="row"
                className="px-4 py-3 align-top text-sm font-medium text-brand-slate md:px-6"
              >
                {row.particular}
              </th>
              <td className="break-words px-4 py-3 text-sm text-brand-slate/90 md:px-6">
                {row.feature}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UpperPhawaTechnicalDetails() {
  return (
    <div className="w-full space-y-10 text-left">
      <div id="upper-phawa-technical">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
          Upper Phawa Khola (5.8 MW)
        </p>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-brand-blue md:text-3xl">
          Technical particulars
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-slate/75">
          Figures below match the company&apos;s consolidated technical disclosure. Revenue
          and escalation lines should be checked against the current PPA tariff schedule when
          used for decisions.
        </p>
      </div>

      <div className="space-y-4 rounded-[4px] border border-slate-200/60 bg-slate-50/80 p-6 md:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-cyan">
          Site and alignment
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-brand-slate/90 md:text-[15px] md:leading-7">
          {upperPhawaSiteContext.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>

      <SpecTable
        caption="Salient design features"
        rows={upperPhawaSalientRows}
        aria-label="Upper Phawa Khola salient design features"
      />

      <SpecTable
        caption="Structures and hydromechanical"
        rows={upperPhawaStructureRows}
        aria-label="Upper Phawa Khola structures and hydromechanical details"
      />
    </div>
  );
}

export function IwaTechnicalDetails() {
  return (
    <div className="w-full space-y-6 text-left">
      <div id="iwa-technical">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan">
          Iwa Khola (15.0 MW)
        </p>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-brand-blue md:text-3xl">
          Key particulars (feasibility)
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-slate/75">
          Tabular summary from the same feasibility-stage materials as the narrative above.
          Do not treat as operational performance until COD is announced.
        </p>
      </div>

      <SpecTable
        caption="Feasibility particulars"
        rows={iwaSalientRows}
        aria-label="Iwa Khola feasibility particulars"
      />
    </div>
  );
}
