import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { mapAppointmentToFrontend } from "@/adapters/appointment.adapter";

export async function GET() {
    const apps = await prisma.appointment.findMany({
        include: {
            client: true,
            service: true
        },
        orderBy: [
            { date: 'asc' },
            { startTime: 'asc' }
        ]
    });

    const formattedApps = apps.map(mapAppointmentToFrontend);
    return NextResponse.json(formattedApps);
}

export async function POST(req: Request) {
    const body = await req.json();

    // Szukamy usługi w bazie na podstawie nazwy z comboboxa
    let service = await prisma.service.findFirst({
        where: { name: body.service }
    });

    if (!service) {
        // Zabezpieczenie: jesli usługi nie ma, zróbmy w locie (żeby to jakoś działało)
        service = await prisma.service.create({
            data: {
                name: body.service,
                price: 0,
                duration: "0",
            }
        });
    }

    const appointment = await prisma.appointment.create({
        data: {
            clientId: body.clientId,
            serviceId: service.id,
            date: new Date(body.date),
            startTime: body.time,
            endTime: body.endTime,
            status: "nadchodząca",
            notes: body.notes
        }
    });

    return NextResponse.json(appointment);
}
