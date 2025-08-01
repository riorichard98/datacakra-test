import PDFDocument from 'pdfkit';
import { Readable } from 'stream'
import dayjs from 'dayjs';

import prisma from '../models/primsa-client';
import { throwRequestError } from '../middleware/error-handler';
import { GENERAL_ERROR_MESSAGE } from '../constants/general-error-message';


export const generateTripHistoryPdf = async (userId: string): Promise<Readable> => {
    const user = await prisma.user.findUnique({
        where: { userId },
        include: {
            trips: {
                orderBy: {
                    startDate: 'desc'
                }
            }
        }
    });

    if (!user) throwRequestError(GENERAL_ERROR_MESSAGE.USER_NOT_FOUND)

    const doc = new PDFDocument();
    const stream = new Readable({ read() { } });

    doc.on('data', (chunk) => stream.push(chunk));
    doc.on('end', () => stream.push(null));

    doc.fontSize(20).text(`Trip History for ${user!.fullName}`, { align: 'center' });
    doc.moveDown();

    user!.trips.forEach((trip, index) => {
        doc
            .fontSize(12)
            .text(`Trip #${index + 1}`)
            .text(`Destination: ${trip.destination}`)
            .text(`Start: ${dayjs(trip.startDate).format('DD MMM YYYY, HH:mm')}`)
            .text(`End: ${dayjs(trip.endDate).format('DD MMM YYYY, HH:mm')}`)
            .moveDown();
    });

    doc.end();

    return stream;
}
