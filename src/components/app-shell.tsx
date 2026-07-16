'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Menu, Search } from 'lucide-react';
import { company, modules } from '@/lib/modules';

function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark">CLP</div>
      <div className="brand-copy">
        <strong>{company.brand}</strong>
        <span>Sistema centralizado</span>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mobile = modules.slice(0, 5);

  return (
    <div className="app-grid">
      <aside className="sidebar">
        <Brand />
        <nav className="nav-list">
          {modules.map(({ slug, label, icon: Icon }) => {
            const href = slug === 'dashboard' ? '/dashboard' : `/modulos/${slug}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={slug} className={`nav-link${active ? ' active' : ''}`} href={href}>
                <Icon size={19} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="main">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Menu size={22} />
            <div>
              <strong>CLP Central</strong>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>Administración integral GLP/GNV</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--muted)' }}><Search size={17} /><span style={{ fontSize: 13 }}>Buscar</span></div>
            <UserButton />
          </div>
        </header>
        {children}
      </div>

      <nav className="mobile-nav">
        {mobile.map(({ slug, label, icon: Icon }) => {
          const href = slug === 'dashboard' ? '/dashboard' : `/modulos/${slug}`;
          return <Link href={href} key={slug}><Icon size={20} /><span>{label}</span></Link>;
        })}
      </nav>
    </div>
  );
}
