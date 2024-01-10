import * as React from 'react';
import {Box} from '@mui/material';
import {QrScanner} from '@yudiel/react-qr-scanner';
import {useState} from 'react';
import ReservationsService from '../../../services/ReservationsService';

function TicketValidation() {
  const [notificationText, setNotificationText] = useState('SPREMNO ZA SKENIRANJE...');
  const [notificationTextColor, setNotificationTextColor] = useState<'red' | 'green' | 'black'>('black');
  const [readyForScan, setReadyForScan] = useState(true);

  function handleError(err: Error) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  const delay = 1500;
  const delayError = 3000;

  function resetScan() {
    setReadyForScan(true);
    setNotificationText('SPREMNO ZA SKENIRANJE...');
    setNotificationTextColor('black');
  }

  function handleScan(decodedText: string) {
    if (decodedText && readyForScan) {
      setReadyForScan(false);
      ReservationsService.validateTicketReservation(decodedText)
        .then((result) => {
          if (result.count > 0) {
            setNotificationTextColor('green');
            setNotificationText(`USPESNO VALIDIRANA REZERVACIJA ID ${decodedText}!`);

            setTimeout(() => {
              resetScan();
            }, delay);
          } else {
            setNotificationTextColor('red');
            setNotificationText(`REZERVACIJA ID ${decodedText} JE NEVAZECA, POKUSAJTE SA DRUGOM REZERVACIJOM!`);

            setTimeout(() => {
              resetScan();
            }, delayError);
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          setNotificationTextColor('red');
          setNotificationText(`GRESKA! POKUSAJTE PONOVO ILI SE OBRATITE ADMINISTRATORU! REZERVACIJA ID ${decodedText}`);

          setTimeout(() => {
            resetScan();
          }, delayError);
        });
    }
  }

  return (
    <Box>
      <Box>SKENIRAJ QR KOD RADI VALIDACIJE</Box>
      <QrScanner
        constraints={{
          facingMode: 'environment',
        }}
        onError={handleError}
        onDecode={handleScan}
      />
      <Box style={{color: notificationTextColor}}>{notificationText}</Box>
    </Box>
  );
}

export default TicketValidation;
