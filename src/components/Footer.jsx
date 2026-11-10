import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-brand">
            <span className="footer-trophy">🏆</span>
            <span className="footer-title">MELHOR DO MUNDO</span>
          </div>
          <p className="footer-text">
            Plataforma independente de apuração esportiva.
            Desenvolvido com React, Node.js, Express e PostgreSQL via Prisma ORM.
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-status-tag">
            <span className="pulse-dot-green" />
            <span>Servidor Conectado & Operacional</span>
          </div>
          <div className="footer-copy">
            © {currentYear} • Projeto Acadêmico de Votação
          </div>
        </div>
      </div>
    </footer>
  );
}

