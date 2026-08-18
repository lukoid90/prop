import { ContactsIcon } from './OwnerIcons'
import ownerRb from '../assets/images/owner-rb.png'
import ownerBecky from '../assets/images/owner-becky.png'
import ownerMichael from '../assets/images/owner-michael.png'
import ownerAd from '../assets/images/owner-ad.png'
import type { Owner } from '../types'

export const CURRENT_OWNER: Owner = {
  id: 'romelu-bayo',
  name: 'Romelu Bayo',
  avatar: ownerRb,
  phone: '+1 (505) 646-0220',
  address: '727 Garden Way, Ozark, MO 73763',
}

const FORMER_OWNERS: Owner[] = [
  {
    id: 'becky-grenson',
    name: 'Becky Grenson',
    avatar: ownerBecky,
    phone: '+1 (417) 573-2284',
    address: '145 Birchwood Ln, Springfield, MO 65804',
  },
  {
    id: 'michael-grenson',
    name: 'Michael Grenson',
    avatar: ownerMichael,
    phone: '+1 (417) 573-2285',
    address: '145 Birchwood Ln, Springfield, MO 65804',
  },
]

const OTHER_OWNERS: Owner[] = [
  {
    id: 'amazing-developments-llc',
    name: 'Amazing Developments LLC',
    avatar: ownerAd,
    phone: '+1 (417) 890-3300',
    address: '900 Commercial St, Springfield, MO 65803',
  },
]

function OwnerCard({ owner, onAddContact }: { owner: Owner; onAddContact: () => void }) {
  return (
    <button
      type="button"
      aria-label={`Add ${owner.name} to contacts`}
      onClick={onAddContact}
      className="flex w-full items-center justify-between rounded-2xl border border-[var(--border-dimmer)] bg-[var(--surface-lighter)] py-3 pl-3 pr-5 text-left"
    >
      <div className="flex items-center gap-4">
        <img src={owner.avatar} alt="" className="size-11 shrink-0 rounded-full object-cover" />
        <div className="flex flex-col items-start whitespace-nowrap">
          <p className="text-[16px] leading-[1.48] tracking-[0px] text-[var(--content-primary)]">{owner.name}</p>
          <p className="text-[14px] leading-[1.48] tracking-[0.25px] text-[var(--content-tertiary)]">Add to contacts</p>
        </div>
      </div>
      <ContactsIcon size={24} />
    </button>
  )
}

export function OwnersSection({ onAddContact }: { onAddContact: (owner: Owner) => void }) {
  return (
    <div className="flex w-full flex-col items-start gap-5 px-4">
      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex flex-col items-start gap-1 text-[var(--content-primary)]">
          <p className="text-[18px] font-bold leading-[1.48]">Current</p>
          <p className="text-[14px] font-bold leading-[1.48] tracking-[0.25px]">Since Jan 2026</p>
        </div>
        <OwnerCard owner={CURRENT_OWNER} onAddContact={() => onAddContact(CURRENT_OWNER)} />
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <p className="text-[18px] font-bold leading-[1.48] text-[var(--content-primary)]">Former</p>
        <p className="text-[14px] font-bold leading-[1.48] tracking-[0.25px] text-[var(--content-primary)]">Jan 2023</p>
        {FORMER_OWNERS.map((owner) => (
          <OwnerCard key={owner.id} owner={owner} onAddContact={() => onAddContact(owner)} />
        ))}
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <p className="text-[14px] font-bold leading-[1.48] tracking-[0.25px] text-[var(--content-primary)]">Jan 2023</p>
        {OTHER_OWNERS.map((owner) => (
          <OwnerCard key={owner.id} owner={owner} onAddContact={() => onAddContact(owner)} />
        ))}
      </div>
    </div>
  )
}
