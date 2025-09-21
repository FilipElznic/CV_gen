import { useEffect, useRef, useState, useCallback } from "react";
import QRCode from "qrcode";
import PropTypes from "prop-types";

function QRCodeGenerator({ url, cvName, size = 200, className = "" }) {
  const canvasRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const generateQRCode = useCallback(async () => {
    if (!url || !canvasRef.current) return;

    setIsGenerating(true);
    setError(null);

    try {
      await QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "M",
      });
    } catch (err) {
      console.error("Error generating QR code:", err);
      setError("Failed to generate QR code");
    } finally {
      setIsGenerating(false);
    }
  }, [url, size]);

  useEffect(() => {
    if (url && canvasRef.current) {
      generateQRCode();
    }
  }, [url, size, generateQRCode]);

  const downloadQRCode = (format = "png") => {
    if (!canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      const link = document.createElement("a");
      const fileName = `${cvName || "cv"}-qr-code.${format}`;

      // Create a new canvas with gradient background for both PNG and JPG
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = canvas.width + 40; // Add padding
      tempCanvas.height = canvas.height + 40; // Add padding

      // Create gradient background
      const gradient = tempCtx.createLinearGradient(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );
      gradient.addColorStop(0, "#000000"); // black
      gradient.addColorStop(0.5, "#18181b"); // zinc-900
      gradient.addColorStop(1, "#27272a"); // zinc-800

      // Fill with gradient background
      tempCtx.fillStyle = gradient;
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // Draw the QR code centered
      tempCtx.drawImage(canvas, 20, 20);

      // Set download properties and trigger download
      link.download = fileName;
      if (format === "jpg" || format === "jpeg") {
        link.href = tempCanvas.toDataURL("image/jpeg", 0.9);
      } else {
        link.href = tempCanvas.toDataURL("image/png");
      }

      link.click();
    } catch (err) {
      console.error("Error downloading QR code:", err);
      setError("Failed to download QR code");
    }
  };

  const copyImageToClipboard = async () => {
    if (!canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          // You could add a toast notification here
          console.log("QR code copied to clipboard");
        } else {
          throw new Error("Clipboard API not supported");
        }
      });
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      // Fallback: copy the URL instead
      try {
        await navigator.clipboard.writeText(url);
        console.log("URL copied to clipboard as fallback");
      } catch (fallbackErr) {
        console.error("Failed to copy URL as fallback:", fallbackErr);
      }
    }
  };

  if (error) {
    return (
      <div className={`text-center p-4 ${className}`}>
        <div className="text-red-400 text-sm">{error}</div>
        <button
          onClick={generateQRCode}
          className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="relative inline-block">
        <canvas
          ref={canvasRef}
          className={`border border-gray-200 rounded-lg shadow-sm ${
            isGenerating ? "opacity-50" : ""
          }`}
        />
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-2">
        <p className="text-xs text-gray-400">Scan to view CV</p>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => downloadQRCode("png")}
            disabled={isGenerating}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📥 PNG
          </button>

          <button
            onClick={() => downloadQRCode("jpg")}
            disabled={isGenerating}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📥 JPG
          </button>

          <button
            onClick={copyImageToClipboard}
            disabled={isGenerating}
            className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📋 Copy
          </button>
        </div>
      </div>
    </div>
  );
}

QRCodeGenerator.propTypes = {
  url: PropTypes.string.isRequired,
  cvName: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default QRCodeGenerator;
