import * as React from 'react';
import {Box} from '@mui/material';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import QrReader from 'react-qr-scanner';
import {useState} from 'react';
import ReservationsService from '../../../services/ReservationsService';

function TicketValidation() {
  const [notificationText, setNotificationText] = useState('SPREMNO ZA SKENIRANJE...');
  const [notificationTextColor, setNotificationTextColor] = useState<'red' | 'green' | 'black'>('black');
  const [readyForScan, setReadyForScan] = useState(true);

  function handleError(err: unknown) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  const delay = 1500;
  const delayError = 3000;

  function handleScan(data: {text: string; timestamp: number}) {
    if (data && readyForScan) {
      setReadyForScan(false);
      ReservationsService.validateTicketReservation(data.text)
        .then((result) => {
          if (result.count > 0) {
            setNotificationTextColor('green');
            setNotificationText(`USPESNO VALIDIRANA REZERVACIJA ID ${data.text}`);

            setTimeout(() => {
              location.reload();
            }, delay);
          } else {
            setNotificationTextColor('red');
            setNotificationText(`GRESKA! REZERVACIJA ID ${data.text} JE NEVAZECA`);

            setTimeout(() => {
              location.reload();
            }, delayError);
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          setNotificationTextColor('red');
          setNotificationText(`GRESKA! POKUSAJTE PONOVO`);

          setTimeout(() => {
            location.reload();
          }, delayError);
        });
    }
  }

  return (
    <Box>
      <Box>SKENIRAJ QR KOD RADI VALIDACIJE</Box>
      <QrReader
        delay={2000}
        style={{
          height: 240,
          width: 320,
        }}
        onError={handleError}
        onScan={handleScan}
      />
      <Box style={{color: notificationTextColor}}>{notificationText}</Box>
    </Box>
  );
}

export default TicketValidation;
