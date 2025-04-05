import QRCode from "react-qr-code";

export default function FormQRPreInscription() {
  const qrCodeValue = "00000000";
  return (
    <form class="flex flex-col items-center justify-center p-12 gap-8">
      <QRCode value={qrCodeValue} size={150} />
      <span class="text-2xl">{qrCodeValue}</span>
      <p class="text-center">Complete your registration using the QR code</p>
    </form>
  );
}
