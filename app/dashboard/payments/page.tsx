import { Button } from '@/components/ui/button';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../../components/ui/table';

export default function PaymentsPage() {
    const payments = [
        // Sample payment data
        { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00', Date: '2022-01-01', },
        { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00', Date: '2022-01-01' },
        // Add more payment objects as needed
    ];

    return (
        <div className='p-5'>
            <h1 className='text-4xl'>Payments</h1>
            <div className='py-5'>
                <Button>Add payment</Button>
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments.map((payment, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{payment.invoice}</TableCell>
                            <TableCell>{payment.status}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>{payment.Date}</TableCell>
                            <TableCell className="text-right">{payment.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
