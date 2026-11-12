import React, { useState, useEffect } from 'react';

const MODALIDADES_RAPIDAS = [
  'Futebol',
  'Basquete',
  'Ginástica Artística',
  'Automobilismo',
  'Skate',
  'Tênis',
  'Natação',
  'Vôlei',
];

export function AddCandidateModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nome: '',
    esporte: '',
    clube: '',
    pais: '',
    foto: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.esporte.trim() || !formData.clube.trim() || !formData.pais.trim()) {
      setFormError('Preencha os campos obrigatórios marcados com (*).');
      return;
    }

    setIsSubmitting(true);
    const success = await onSubmit({
      nome: formData.nome.trim(),
      esporte: formData.esporte.trim(),
      clube: formData.clube.trim(),
      pais: formData.pais.trim(),
      foto: formData.foto.trim() || null,
    });
    setIsSubmitting(false);

    if (success) {
      setFormData({ nome: '', esporte: '', clube: '', pais: '', foto: '' });
    }
  };

  return (
    <div className="brutal-modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="brutal-modal-card">
        <div className="modal-top-ticket-header">
          <div>
            <span className="ticket-stamp">CREDENCIAL OFICIAL</span>
            <h2 className="modal-title-bold">INSCREVER NOVO ATLETA</h2>
          </div>
          <button
            type="button"
            className="modal-cross-btn"
            onClick={onClose}
            title="Fechar formulário"
          >
            ✕
          </button>
        </div>

        {formError && (
          <div className="brutal-alert-box">
            <span>⚠️</span>
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="brutal-form-body">
          <div className="form-input-block">
            <label className="brutal-label">NOME COMPLETO DO ATLETA *</label>
            <input
              type="text"
              className="brutal-input-field"
              placeholder="Ex: Rayssa Leal, Vinicius Jr..."
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              required
            />
          </div>

          <div className="form-twin-row">
            <div className="form-input-block">
              <label className="brutal-label">MODALIDADE ESPORTIVA *</label>
              <input
                type="text"
                list="sports-list-suggest"
                className="brutal-input-field"
                placeholder="Ex: Futebol, Skate..."
                value={formData.esporte}
                onChange={(e) => handleChange('esporte', e.target.value)}
                required
              />
              <datalist id="sports-list-suggest">
                {MODALIDADES_RAPIDAS.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>

            <div className="form-input-block">
              <label className="brutal-label">CLUBE OU EQUIPE *</label>
              <input
                type="text"
                className="brutal-input-field"
                placeholder="Ex: Real Madrid, Flamengo..."
                value={formData.clube}
                onChange={(e) => handleChange('clube', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-input-block">
            <label className="brutal-label">PAÍS DE REPRESENTAÇÃO *</label>
            <input
              type="text"
              className="brutal-input-field"
              placeholder="Ex: Brasil, Estados Unidos..."
              value={formData.pais}
              onChange={(e) => handleChange('pais', e.target.value)}
              required
            />
          </div>

          <div className="form-input-block">
            <label className="brutal-label">LINK DA FOTO DO ATLETA (OPCIONAL)</label>
            <input
              type="url"
              className="brutal-input-field"
              placeholder="https://..."
              value={formData.foto}
              onChange={(e) => handleChange('foto', e.target.value)}
            />
          </div>

          {/* Live Preview */}
          {formData.foto && (
            <div className="brutal-preview-box">
              <span className="preview-stamp">PRÉVIA DO CARD:</span>
              <div className="preview-circle-frame">
                <img
                  src={formData.foto}
                  alt="Prévia"
                  className="preview-img-tag"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'block';
                    }
                  }}
                />
                <span className="preview-fail-txt" style={{ display: 'none' }}>
                  Link inválido ou imagem indisponível
                </span>
              </div>
            </div>
          )}

          <div className="modal-actions-footer">
            <button
              type="button"
              className="brutal-btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="brutal-btn btn-action"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : '✓ Confirmar Inscrição'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
