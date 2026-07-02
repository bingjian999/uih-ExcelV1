/**
 * Proxy warning banner.
 *
 * State-driven inline banner shown above chat messages when the local proxy is
 * unavailable. Expands inline with quick setup guidance.
 */

import { AlertTriangle, Check, Copy, lucide } from "./lucide-icons.js";

const PROXY_COMMAND = "npx uih-excel-proxy";
const INSTALL_GUIDE_URL = "https://pi.dev/excel#connect";

export type ProxyBannerState = "detected" | "not-detected" | "unknown";

export interface ProxyBannerHandle {
  root: HTMLElement;
  update: (state: ProxyBannerState) => void;
}

function selectElementText(element: HTMLElement): void {
  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
}

export function createProxyBanner(): ProxyBannerHandle {
  const root = document.createElement("section");
  root.className = "pi-proxy-banner";
  root.hidden = true;

  const topRow = document.createElement("div");
  topRow.className = "pi-proxy-banner__row";

  const text = document.createElement("p");
  text.className = "pi-proxy-banner__text";

  const warningIcon = lucide(AlertTriangle);
  warningIcon.classList.add("pi-proxy-banner__text-icon");
  warningIcon.setAttribute("aria-hidden", "true");

  const textLabel = document.createElement("span");
  textLabel.textContent = "代理未运行 · 部分功能将不可用。";

  text.append(warningIcon, textLabel);

  const action = document.createElement("button");
  action.type = "button";
  action.className = "pi-proxy-banner__action";
  action.textContent = "如何修复 →";

  topRow.append(text, action);

  const details = document.createElement("div");
  details.className = "pi-proxy-banner__details";
  details.hidden = true;

  const detailsIntro = document.createElement("p");
  detailsIntro.className = "pi-proxy-banner__details-text";
  detailsIntro.textContent = "在终端中运行此命令并保持窗口打开：";

  const codeRow = document.createElement("div");
  codeRow.className = "pi-proxy-banner__code";

  const code = document.createElement("code");
  code.textContent = PROXY_COMMAND;

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "pi-proxy-banner__copy";

  let resetCopyIconTimeout: ReturnType<typeof setTimeout> | null = null;

  const renderCopyIcon = (): void => {
    copyButton.replaceChildren(lucide(Copy));
    copyButton.title = "复制命令";
    copyButton.setAttribute("aria-label", "复制命令");
  };

  const renderCopiedIcon = (): void => {
    copyButton.replaceChildren(lucide(Check));
    copyButton.title = "已复制";
    copyButton.setAttribute("aria-label", "已复制");
  };

  renderCopyIcon();

  copyButton.addEventListener("click", () => {
    if (!navigator.clipboard?.writeText) {
      selectElementText(code);
      return;
    }

    void navigator.clipboard.writeText(PROXY_COMMAND).then(
      () => {
        renderCopiedIcon();
        if (resetCopyIconTimeout) {
          clearTimeout(resetCopyIconTimeout);
        }
        resetCopyIconTimeout = setTimeout(() => {
          renderCopyIcon();
          resetCopyIconTimeout = null;
        }, 1400);
      },
      () => {
        selectElementText(code);
      },
    );
  });

  codeRow.append(code, copyButton);

  const hint = document.createElement("p");
  hint.className = "pi-proxy-banner__hint";
  hint.textContent = "打开终端 · 粘贴 · 按 Enter · 如提示输入 y 并按 Enter · 保持打开";

  const guideLink = document.createElement("a");
  guideLink.className = "pi-proxy-banner__link";
  guideLink.href = INSTALL_GUIDE_URL;
  guideLink.target = "_blank";
  guideLink.rel = "noopener noreferrer";
  guideLink.textContent = "没有 Node.js？查看安装指南 →";

  details.append(detailsIntro, codeRow, hint, guideLink);

  action.addEventListener("click", () => {
    const shouldOpen = details.hidden;
    details.hidden = !shouldOpen;
    root.classList.toggle("is-open", shouldOpen);
    action.textContent = shouldOpen ? "隐藏步骤" : "如何修复 →";
  });

  root.append(topRow, details);

  const update = (state: ProxyBannerState): void => {
    const shouldShow = state === "not-detected";
    root.hidden = !shouldShow;

    if (!shouldShow) {
      details.hidden = true;
      root.classList.remove("is-open");
      action.textContent = "如何修复 →";
    }
  };

  return { root, update };
}
