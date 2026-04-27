import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const body = await req.json();

    const appointment = await prisma.appointment.update({
        where: { id: parseInt(id) },
        data: {
            status: body.status,
            notes: body.notes !== undefined ? body.notes : undefined,
             // ... ewentualnie tu dopiszemy cenę i zdjęcia w schemacie Prisma
        }
    });

    return NextResponse.json(appointment);
}
