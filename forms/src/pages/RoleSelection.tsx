import React from 'react'
import { useForm, Role } from '../context/FormContext'

/* ─── SVG Icons ─── */
const SellerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
)

const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9,6 15,12 9,18" />
  </svg>
)

const roles: { value: Role; label: string; description: string; Icon: React.FC }[] = [
  {
    value: 'seller',
    label: 'Seller View',
    description: 'List a property for sale, lease, or rent',
    Icon: SellerIcon,
  },
  {
    value: 'user',
    label: 'User View',
    description: 'Search for properties to buy, lease, or rent',
    Icon: UserIcon,
  },
]

export default function RoleSelection() {
  const { state, dispatch } = useForm()

  const handleSelect = (role: Role) => {
    dispatch({ type: 'setRole', role })
  }

  return (
    <div className="page-enter" style={{ padding: '32px 20px' }}>
      <h1 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '1.5rem',
        fontWeight: 600,
        color: 'var(--text)',
        marginBottom: '4px',
      }}>
        Get Started
      </h1>

      <div className="flex flex-col gap-3">
        {roles.map(({ value, label, description, Icon }) => (
          <button
            key={value}
            type="button"
            className={`role-card ${state.role === value ? 'selected' : ''}`}
            onClick={() => handleSelect(value)}
            style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              minWidth: '52px',
              borderRadius: '8px',
              background: 'var(--surface-low)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text)',
            }}>
              <Icon />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text)',
                marginBottom: '2px',
              }}>
                {label}
              </div>
              <div style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.4,
              }}>
                {description}
              </div>
            </div>
            <ArrowRight />
          </button>
        ))}
      </div>
    </div>
  )
}
