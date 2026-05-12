import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    
    // Kasujemy wizyty z tym przypisane i potem usuniecie
    await prisma.appointment.deleteMany({
        where: { clientId: parseInt(id) }
    });

    await prisma.client.delete({
        where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const body = await request.json();

    const updatedClient = await prisma.client.update({
        where: { id: parseInt(id) },
        data: {
            name: body.name,
            phone: body.phone,
            email: body.email,
            notes: body.notes
        }
    });

    return NextResponse.json(updatedClient);
}
