import Calendar from '@/components/calendar/Calendar';
import { History } from '@/types/companies/calendar/type';


const data: History[] = [
  {
    "mId": "tvivarepublica",
    "transactionKey": "D35A35F4DE02F7A05F4A4B9E1391385C",
    "paymentKey": "OR1ZwdkQD5GePWvyJnrKj6XwbXNMmqVgLzN97EoqYA60XKx4",
    "orderId": "MC43MDc0NTQxMzU2OTc3",
    "method": "간편결제",
    "customerKey": "@@ANONYMOUS",
    "useEscrow": false,
    "receiptUrl": "https://dashboard.tosspayments.com/receipt/redirection?transactionId=tviva202402291341558Lpz3&ref=PX",
    "status": "DONE",
    "transactionAt": "2024-02-29T13:42:26+09:00",
    "currency": "KRW",
    "amount": 1000
  },
  {
    "mId": "tvivarepublica",
    "transactionKey": "30BEB4319B27D81BCB2689B5E2FFDAD0",
    "paymentKey": "gpMwnkjKyO6BYq7GWPVvNxDKez9zo7VNE5vbo1d4JlALRXxz",
    "orderId": "RP5eQaz3d76LMzK6E3VOl",
    "method": "간편결제",
    "customerKey": "@@ANONYMOUS",
    "useEscrow": false,
    "receiptUrl": "https://dashboard.tosspayments.com/receipt/redirection?transactionId=tviva202402291433108LpQ0&ref=PX",
    "status": "DONE",
    "transactionAt": "2024-02-29T14:33:30+09:00",
    "currency": "KRW",
    "amount": 1000
  },
  {
    "mId": "tvivarepublica",
    "transactionKey": "E28C83E216B7D516421F339949AB6EAC",
    "paymentKey": "xMBvpmjnoD4yKeq5bgrpP657Ej27xJrGX0lzW6YOQJ1w9NLR",
    "orderId": "BMPMIWa-eJMXxIHkx5QVJ",
    "method": "간편결제",
    "customerKey": "@@ANONYMOUS",
    "useEscrow": false,
    "receiptUrl": "https://dashboard.tosspayments.com/receipt/redirection?transactionId=tviva202402291452436q0z1&ref=PX",
    "status": "DONE",
    "transactionAt": "2024-02-29T14:53:04+09:00",
    "currency": "KRW",
    "amount": 8000
  },
  {
    "mId": "tvivarepublica",
    "transactionKey": "38722FFD8FF3C84229D28D95DFE47B33",
    "paymentKey": "pd12AjJexmnRQoOaPz8Ld7eEWJD7R58y47BMw6vl0gkYqDNE",
    "orderId": "_KZEMv9fulPbaqosYY4y1",
    "method": "간편결제",
    "customerKey": "@@ANONYMOUS",
    "useEscrow": false,
    "receiptUrl": "https://dashboard.tosspayments.com/receipt/redirection?transactionId=tviva202402291842128LrE2&ref=PX",
    "status": "DONE",
    "transactionAt": "2024-02-29T18:42:36+09:00",
    "currency": "KRW",
    "amount": 8000
  }
]


// const getData = async (): Promise<History[]> => {
//   return await fetch('https://payment.free.beeceptor.com/historys').then((res) => res.json());
// };

export default async function CalendarPage() {
  // const data = await getData();
  data.sort((a, b) => {
    const dateA = new Date(a.transactionAt);
    const dateB = new Date(b.transactionAt);

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    return dateA.getTime() - dateB.getTime();
  });

  return <Calendar history={data} />;
}
