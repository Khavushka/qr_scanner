// Select elements
const qrCodeReader = document.getElementById('qr-code-reader');
const qrVideo = document.getElementById('qr-video');
const qrCanvas = document.getElementById('qr-canvas');
const qrContext = qrCanvas.getContext('2d');

// Set canvas size to match video size
qrVideo.addEventListener('loadedmetadata', () => {
  qrCanvas.width = qrVideo.videoWidth;
  qrCanvas.height = qrVideo.videoHeight;
});

// Start video stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    qrVideo.srcObject = stream;
    qrVideo.play();
  })
  .catch((err) => {
    console.error(`Error accessing camera: ${err}`);
  });

// Decode QR code
qrVideo.addEventListener('play', () => {
  const decode = () => {
    qrContext.drawImage(qrVideo, 0, 0, qrCanvas.width, qrCanvas.height);
    try {
      const qr = new QRCodeDecoder().decode(qrCanvas);
      console.log(`QR code detected: ${qr}`);
    } catch (err) {
      console.error(`Error decoding QR code: ${err}`);
    }
    requestAnimationFrame(decode);
  };
  requestAnimationFrame(decode);
});

// Stop video stream on page exit
window.addEventListener('beforeunload', () => {
  qrVideo.srcObject.getTracks().forEach(track => track.stop());
});
