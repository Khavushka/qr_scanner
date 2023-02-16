import QrScanner from 'qrscanner';

const video = document.getElementById('qr-video');

const scanner = new QrScanner(video, result => {
    const url = reuslt.trim();
    window.location.href = url;
});

scanner.start();