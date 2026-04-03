// components/sections/TeamGrid.tsx
import Image from 'next/image'

type TeamMember = {
  _key: string
  name: string
  role: string
  photo?: { url: string; alt: string }
}

type TeamGridProps = {
  sectionTitle?: string
  members: TeamMember[]
}

export default function TeamGrid({ sectionTitle, members }: TeamGridProps) {
  return (
    <section className="py-space-12 px-space-6" data-gsap="team-grid">
      <div className="max-w-7xl mx-auto flex flex-col gap-space-8">
        {sectionTitle && (
          <h2 className="text-title-page font-bold text-text-primary leading-[1.2]">
            {sectionTitle}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-6">
          {members.map((member) => (
            <div key={member._key} className="flex flex-col items-center gap-space-3 text-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-border-default">
                {member.photo && (
                  <Image
                    src={member.photo.url}
                    alt={member.photo.alt}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="text-body font-semibold text-text-primary">{member.name}</p>
                <p className="text-body-sm text-text-secondary">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
