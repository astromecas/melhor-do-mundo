import React, { useState, useEffect } from 'react';

const MODALIDADES_SUGERIDAS = [
  'Futebol',
  'Basquete',
  'Ginástica Artística',
  'Automobilismo',
  'Skate',
  'Tênis',
  'Natação',
  'Vôlei',
  'Atletismo',
  'Surfe',
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

  // Fecha modal ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.esporte.trim() || !formData.clube.trim() || !formData.pais.trim()) {
      setFormError('Por favor, preencha todos os campos obrigatórios (*).');
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
    <div className="modal-backdrop-layer" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-dialog-box">
        <div className="modal-header-section">
          <div>
            <span className="modal-kicker">PREMIAÇÃO OFICIAL</span>
            <h2 className="modal-main-title">Cadastrar Novo Indicado</h2>
          </div>
          <button
            type="button"
            className="modal-close-icon-btn"
            onClick={onClose}
            title="Fechar janela"
          >
            ✕
          </button>
        </div>

        {formError && (
          <div className="form-error-banner">
            <span>⚠️</span>
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form-body">
          {/* Campo Nome */}
          <div className="input-group">
            <label className="input-field-label">
              Nome Completo do Atleta <span className="req-asterisk">*</span>
            </label>
            <input
              type="text"
              className="custom-text-input"
              placeholder="Ex: Vinícius Jr., Simone Biles..."
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              required
            />
          </div>

          {/* Linha Esporte + Clube */}
          <div className="input-row-twin">
            <div className="input-group">
              <label className="input-field-label">
                Modalidade / Esporte <span className="req-asterisk">*</span>
              </label>
              <input
                type="text"
                list="sports-suggestions"
                className="custom-text-input"
                placeholder="Ex: Futebol, Basquete..."
                value={formData.esporte}
                onChange={(e) => handleChange('esporte', e.target.value)}
                required
              />
              <datalist id="sports-suggestions">
                {MODALIDADES_SUGERIDAS.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>

            <div className="input-group">
              <label className="input-field-label">
                Clube / Delegação <span className="req-asterisk">*</span>
              </label>
              <input
                type="text"
                className="custom-text-input"
                placeholder="Ex: Real Madrid, Flamengo..."
                value={formData.clube}
                onChange={(e) => handleChange('clube', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Campo País */}
          <div className="input-group">
            <label className="input-field-label">
              País de Representação <span className="req-asterisk">*</span>
            </label>
            <input
              type="text"
              className="custom-text-input"
              placeholder="Ex: Brasil, Argentina, Estados Unidos..."
              value={formData.pais}
              onChange={(e) => handleChange('pais', e.target.value)}
              required
            />
          </div>

          {/* Campo URL da Foto com Preview */}
          <div className="input-group">
            <label className="input-field-label">
              URL da Foto Oficial (opcional)
            </label>
            <input
              type="url"
              className="custom-text-input"
              placeholder="https://exemplo.com/foto-do-atleta.jpg"
              value={formData.foto}
              onChange={(e) => handleChange('foto', e.target.value)}
            />
          </div>

          {/* Preview da Imagem se informada */}
          {formData.foto && (
            <div className="live-photo-preview-box">
              <span className="preview-label">Pré-visualização da imagem:</span>
              <div className="preview-avatar-circle">
                <img
                  src={formData.foto}
                  alt="Prévia do atleta"
                  className="preview-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'block';
                    }
                  }}
                />
                <span className="preview-error-hint" style={{ display: 'none' }}>
                  Não foi possível carregar a imagem deste link.
                </span>
              </div>
            </div>
          )}

          {/* Ações do Rodapé */}
          <div className="modal-actions-bar">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="modal-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Cadastrar Indicado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

