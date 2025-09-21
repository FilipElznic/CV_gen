import { useState } from "react";
import PropTypes from "prop-types";
import QRCodeGenerator from "./QRCodeGenerator";

function QRCodeModal({ isOpen, onClose, cvData, cvSlug }) {
  const [qrSize, setQrSize] = useState(200);

  if (!isOpen) return null;

  const cvUrl = `${window.location.origin}/cv/${cvSlug}`;
  const cvName = cvData?.personalInfo?.fullName || "CV";

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-black via-zinc-900 to-zinc-800 rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto border border-zinc-700 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">
              QR Code for {cvName}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 text-xl transition-colors"
            >
              ✕
            </button>
          </div>

          {/* QR Code Size Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              QR Code Size
            </label>
            <select
              value={qrSize}
              onChange={(e) => setQrSize(Number(e.target.value))}
              className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value={150}>Small (150px)</option>
              <option value={200}>Medium (200px)</option>
              <option value={300}>Large (300px)</option>
              <option value={400}>Extra Large (400px)</option>
            </select>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-4">
            <QRCodeGenerator url={cvUrl} cvName={cvName} size={qrSize} />
          </div>

          {/* URL Display */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              CV Link
            </label>
            <div className="flex">
              <input
                type="text"
                value={cvUrl}
                readOnly
                className="flex-1 p-2 bg-zinc-700 border border-zinc-600 rounded-l-md text-gray-300 text-sm"
              />
              <button
                onClick={() => navigator.clipboard.writeText(cvUrl)}
                className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 text-sm transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                Scan this QR code to instantly access the CV on any device
              </p>
            </div>

            {/* Share Button (if Web Share API is available) */}
            {"share" in navigator && (
              <button
                onClick={() =>
                  navigator.share({
                    title: `${cvName}'s CV`,
                    url: cvUrl,
                  })
                }
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
              >
                📱 Share via Device
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full border border-zinc-600 py-2 rounded-lg hover:bg-zinc-700 transition duration-200 text-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

QRCodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cvData: PropTypes.object,
  cvSlug: PropTypes.string.isRequired,
};

export default QRCodeModal;
