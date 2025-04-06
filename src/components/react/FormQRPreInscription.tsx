import QRCode from "react-qr-code";

interface Props {
  qrCodeValue?: string;
}

export default function FormQRPreInscription({ qrCodeValue }: Props) {
  return (
    <div class="flex flex-col items-center justify-center p-12 gap-8">
      {qrCodeValue && (
        <>
          <QRCode value={qrCodeValue} size={150} />
          <span class="text-2xl">{qrCodeValue}</span>
          <p class="text-center">
            Complete your registration using the QR code
          </p>
        </>
      )}
    </div>
  );
}
