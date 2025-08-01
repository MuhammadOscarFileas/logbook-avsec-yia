import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ 
  onSignatureChange, 
  disabled = false, 
  placeholder = "Tanda tangan di sini...",
  width = 320,
  height = 120,
  penColor = "#000000",
  backgroundColor = "#ffffff",
  defaultValue = ''
}) => {
  const sigPadRef = useRef(null);
  const [hasSignature, setHasSignature] = useState(!!defaultValue);

  // Fungsi untuk menggambar signature di tengah canvas
  const drawCenteredSignature = (base64) => {
    if (!sigPadRef.current || !base64) return;
    const canvas = sigPadRef.current.getCanvas();
    const ctx = canvas.getContext('2d');
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Buat image dari base64
    const img = new window.Image();
    img.onload = function() {
      // Hitung offset agar gambar di tengah
      const x = (canvas.width - img.width) / 2;
      const y = (canvas.height - img.height) / 2;
      ctx.drawImage(img, x, y);
    };
    img.src = base64;
  };

  // Set default value (base64) saat komponen mount atau defaultValue berubah
  useEffect(() => {
    if (sigPadRef.current && defaultValue) {
      drawCenteredSignature(defaultValue);
      setHasSignature(true);
    }
    if (sigPadRef.current && !defaultValue) {
      sigPadRef.current.clear();
      setHasSignature(false);
    }
    // eslint-disable-next-line
  }, [defaultValue]);

  const handleEnd = () => {
    if (sigPadRef.current) {
      const signatureData = sigPadRef.current.getCanvas().toDataURL('image/png');
      setHasSignature(true);
      onSignatureChange(signatureData);
    }
  };

  const handleClear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
      setHasSignature(false);
      onSignatureChange('');
    }
  };

  return (
    <div className="signature-pad-container">
      <div 
        className="signature-pad-border"
        style={{
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: backgroundColor,
          padding: '12px',
          width: '100%',
          minHeight: height + 40,
          position: 'relative'
        }}
      >
        {disabled ? (
          <div 
            className="signature-disabled"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: height,
              color: '#9ca3af',
              fontSize: '14px',
              fontStyle: 'italic'
            }}
          >
            {placeholder}
          </div>
        ) : (
          <>
            <SignatureCanvas
              ref={sigPadRef}
              penColor={penColor}
              canvasProps={{
                width: width,
                height: height,
                className: 'signature-canvas',
                style: {
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  backgroundColor: backgroundColor
                }
              }}
              onEnd={handleEnd}
              clearOnResize={false}
            />
            <div className="signature-controls" style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleClear}
                className="clear-signature-btn"
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Clear
              </button>
              {hasSignature && (
                <span 
                  className="signature-status"
                  style={{
                    color: '#059669',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  ✓ Tanda tangan sudah diisi
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignaturePad; 