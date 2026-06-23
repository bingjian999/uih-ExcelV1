import"./register-components-Cy2CfCvT.js";var e=document.getElementById(`gallery-root`);if(!e)throw Error(`Missing #gallery-root`);var t=e;t.style.cssText=`
  max-width: 380px;
  margin: 0 auto;
  padding: 16px;
  font-family: var(--font-sans);
  background: var(--background);
  color: var(--foreground);
  min-height: 100vh;
`;function n(e,n){let r=document.createElement(`div`);r.setAttribute(`data-gallery`,e),r.style.cssText=`margin-bottom: 32px;`;let i=document.createElement(`h3`);return i.textContent=n,i.style.cssText=`
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted-foreground);
    margin: 0 0 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--alpha-8);
  `,r.appendChild(i),t.appendChild(r),r}var r=n(`badges`,`Overlay Badges`),i=document.createElement(`div`);i.style.cssText=`display: flex; gap: 8px; flex-wrap: wrap;`;for(let e of[`muted`,`ok`,`warn`,`info`]){let t=document.createElement(`span`);t.className=`pi-overlay-badge pi-overlay-badge--${e}`,t.textContent=e===`muted`?`只读`:e===`ok`?`Connected`:e===`warn`?`Warning`:`Info`,i.appendChild(t)}r.appendChild(i);var a=n(`file-items`,`File List Items`);function o(e,t,n){let r=document.createElement(`button`);r.type=`button`,r.className=`pi-files-item pi-files-item--muted`,r.style.cssText=`width: 100%;`;let i=document.createElement(`span`);i.className=`pi-files-item__icon`,i.textContent=`📄`;let a=document.createElement(`div`);a.className=`pi-files-item__info`;let o=document.createElement(`div`);o.className=`pi-files-item__name-row`;let s=document.createElement(`span`);if(s.className=`pi-files-item__name`,s.textContent=e,o.appendChild(s),n){let e=document.createElement(`span`);e.className=`pi-overlay-badge pi-overlay-badge--muted`,e.textContent=n,o.appendChild(e)}let c=document.createElement(`span`);c.className=`pi-files-item__meta`,c.textContent=t,a.append(o,c);let l=document.createElement(`span`);return l.className=`pi-files-item__arrow`,l.textContent=`›`,r.append(i,a,l),r}a.appendChild(o(`cache-observability-baselines.md`,`联影AI 文档 · 2.98 KB`,`只读`)),a.appendChild(o(`context-management-policy.md`,`联影AI 文档 · 12.0 KB`,`只读`)),a.appendChild(o(`quarterly-report.xlsx`,`1.2 MB · Uploaded · 2h ago`));var s=n(`tool-cards`,`Tool Cards`);function c(e,t,n){let r=document.createElement(`div`);r.className=`pi-tool-card`,r.setAttribute(`data-state`,e),r.setAttribute(`data-tool-name`,`fill_formula`);let i=document.createElement(`div`);i.className=`pi-tool-card__header`;let a=document.createElement(`div`);a.className=`pi-tool-card__toggle pi-tool-card__toggle--static`;let o=document.createElement(`span`);o.className=`pi-tool-card__toggle-main`;let s=document.createElement(`span`);return s.className=`pi-tool-card__title`,s.innerHTML=`<strong>${t}</strong> <span class="pi-tool-card__detail-text">${n}</span>`,o.appendChild(s),a.appendChild(o),i.appendChild(a),r.appendChild(i),r}s.appendChild(c(`complete`,`Filled`,`'Cash Flow'!D10:L10 — 9 changes`)),s.appendChild(c(`complete`,`Filled`,`'Cash Flow'!D13:L13 — 9 changes`)),s.appendChild(c(`complete`,`Filled`,`'Cash Flow'!D14:L14 — 9 changes`)),s.appendChild(c(`error`,`Fill`,`'Cash Flow'!D15:L15 — error`));var l=n(`tool-groups`,`Grouped Tool Cards`),u=document.createElement(`div`);u.className=`pi-tool-group`;for(let e=10;e<=14;e++){let t=document.createElement(`div`),n=c(`complete`,`Filled`,`'Cash Flow'!D${e}:L${e} — 9 changes`);t.appendChild(n),u.appendChild(t)}l.appendChild(u);var d=n(`diff-table`,`Cell Changes Diff Table`),f=document.createElement(`div`);f.className=`pi-tool-card__section`,f.innerHTML=`
  <div class="pi-tool-card__section-label">Changes (9)</div>
  <div class="pi-tool-card__diff">
    <table class="pi-tool-card__diff-table">
      <thead>
        <tr><th>Cell</th><th>Before</th><th>After</th></tr>
      </thead>
      <tbody>
        <tr>
          <td class="pi-tool-card__diff-cell"><span class="pi-cell-ref">D10</span></td>
          <td>
            <div class="pi-tool-card__diff-value">$125,000</div>
            <div class="pi-tool-card__diff-formula">ƒ =C19+C24</div>
          </td>
          <td>
            <div class="pi-tool-card__diff-value">$130,000</div>
            <div class="pi-tool-card__diff-formula">ƒ =D19+D24</div>
          </td>
        </tr>
        <tr>
          <td class="pi-tool-card__diff-cell"><span class="pi-cell-ref">E10</span></td>
          <td>
            <div class="pi-tool-card__diff-value">$130,000</div>
            <div class="pi-tool-card__diff-formula">ƒ =D19+D24</div>
          </td>
          <td>
            <div class="pi-tool-card__diff-value">$135,000</div>
            <div class="pi-tool-card__diff-formula">ƒ =E19+E24</div>
          </td>
        </tr>
        <tr>
          <td class="pi-tool-card__diff-cell"><span class="pi-cell-ref">F10</span></td>
          <td>
            <div class="pi-tool-card__diff-value">$135,000</div>
            <div class="pi-tool-card__diff-formula">ƒ =E19+E24</div>
          </td>
          <td>
            <div class="pi-tool-card__diff-value">$140,000</div>
            <div class="pi-tool-card__diff-formula">ƒ =F19+F24</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
`,d.appendChild(f);var p=n(`text-preview`,`File Text Preview`),m=document.createElement(`div`);m.className=`pi-files-detail-preview pi-files-detail-preview--text`;var h=[`# Context Management Policy`,``,`**Status:** Active policy (2026-02-12)`,`**Scope:** How 联影AI_Base_PI builds and manages context`,``,`---`,``,`## Why this exists`,``,`We optimize for **answer quality and reliability** across multi-turn sessions.`,``,`In practice, quality drops when we blindly stuff context or let it grow unbounded.`,``,`## Core principles`,``,`1. **Minimal viable context** — include only what improves this turn.`,`2. **Freshness over volume** — recent state > historical state.`,`3. **Structured disclosure** — progressive detail, not a wall of text.`,`4. **Cache-friendly ordering** — static prefix, dynamic tail.`,`5. **Bounded growth** — auto-compact before hitting limits.`];h.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`pi-files-detail-preview__line`,t===0&&(n.style.paddingTop=`8px`),t===h.length-1&&(n.style.paddingBottom=`8px`);let r=document.createElement(`span`);r.className=`pi-files-detail-preview__ln`,r.textContent=String(t+1);let i=document.createElement(`span`);i.className=`pi-files-detail-preview__code`,i.textContent=e,n.append(r,i),m.appendChild(n)}),p.appendChild(m);var g=n(`buttons`,`Overlay Buttons`),_=document.createElement(`div`);_.className=`pi-files-detail-actions`;for(let[e,t]of[[`Open ↗`,`pi-overlay-btn pi-overlay-btn--ghost pi-overlay-btn--compact`],[`Download`,`pi-overlay-btn pi-overlay-btn--ghost pi-overlay-btn--compact`],[`Delete`,`pi-overlay-btn pi-overlay-btn--danger pi-overlay-btn--compact`]]){let n=document.createElement(`button`);n.type=`button`,n.className=t,n.textContent=e,_.appendChild(n)}g.appendChild(_);var v=n(`toasts`,`Toast Notifications`);for(let[e,t]of[[`Closed Chat 3`,`pi-toast visible pi-toast--action`],[`Tab name reset`,`pi-toast visible`],[`Could not save`,`pi-toast visible pi-toast--error`]]){let n=document.createElement(`div`);n.className=t,n.style.cssText=`position: relative; top: 0; left: 0; transform: none; opacity: 1; pointer-events: auto; margin-bottom: 8px;`;let r=document.createElement(`div`);r.className=`pi-toast__content`;let i=document.createElement(`span`);if(i.className=`pi-toast__message`,i.textContent=e,r.appendChild(i),t.includes(`pi-toast--action`)){let e=document.createElement(`button`);e.type=`button`,e.className=`pi-toast__action`,e.textContent=`Undo`,r.appendChild(e)}n.appendChild(r),v.appendChild(n)}var y=n(`markdown`,`Markdown Rendering (font consistency)`),b=document.createElement(`markdown-block`);b.content=`The formula is \`=IF(C$4-Assumptions!$B$10+1=Assumptions!$B$49,...)\` — C4 = calendaryear (2025 for Year 1, 2031 for Year 7).

Assumptions!B10 = 2025 (start year) − Assumptions!B$49 = 7

So for Year 7 (column I, calendar year 2031): 2031 – 2025 + 1 = 7 ✓`,y.appendChild(b),console.log(`[ui-gallery] Rendered all sections`);