import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { mapAppointmentToFrontend } from "@/adapters/appointment.adapter";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    
    const client = await prisma.client.findUnique({
        where: { id: parseInt(id) }
    });
    
    if(!client) return new NextResponse("Not found", {status: 404});

    const apps = await prisma.appointment.findMany({
        where: { clientId: parseInt(id) },
        include: { service: true, client: true },
        orderBy: { date: 'desc' }
    });

    return NextResponse.json({
        client,
        visits: apps.map(mapAppointmentToFrontend)
    });
}
