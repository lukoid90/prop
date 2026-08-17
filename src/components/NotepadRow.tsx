import type { ReactNode } from 'react'

const LINE_STYLE = {
  small: 'text-[14px] leading-[1.48] tracking-[0.25px] text-[var(--content-tertiary)]',
  large: 'text-[16px] leading-[1.48] tracking-[0px] text-[var(--content-primary)]',
}

export function NotepadRow({
  avatarImage,
  topLine,
  bottomLine,
  action,
  background,
  avatarSize = 44,
}: {
  avatarImage: string
  topLine: { text: string; size: keyof typeof LINE_STYLE }
  bottomLine: { text: string; size: keyof typeof LINE_STYLE }
  action?: ReactNode
  background: string
  avatarSize?: number
}) {
  return (
    <div
      className="flex w-full items-center justify-between rounded-2xl border border-[var(--border-default)] px-5 py-4"
      style={{ background }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <img
          src={avatarImage}
          alt=""
          className="shrink-0 rounded-full object-cover"
          style={{ width: avatarSize, height: avatarSize }}
        />
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className={`w-full truncate ${LINE_STYLE[topLine.size]}`}>{topLine.text}</p>
          <p className={`w-full truncate ${LINE_STYLE[bottomLine.size]}`}>{bottomLine.text}</p>
        </div>
      </div>
      {action}
    </div>
  )
}
