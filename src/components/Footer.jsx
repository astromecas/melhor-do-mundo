import React from 'react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-brand">🏆 MELHOR DO MUNDO 2026</span>
        <span className="footer-tech">React · Node.js · Express · PostgreSQL · Prisma</span>
        <span className="footer-copy">© {new Date().getFullYear()} Projeto Acadêmico</span>
      </div>
    </footer>
  );
}
