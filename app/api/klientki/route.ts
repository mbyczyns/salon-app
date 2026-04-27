import { prisma } from "@/lib/prisma";

export async function GET() {
    const clients = await prisma.client.findMany({
        orderBy: { createdAt: "desc" }
    });

    return Response.json(clients);
}

export async function POST(req: Request) {
    const body = await req.json();

    const client = await prisma.client.create({
        data: {
            name: body.name,
            phone: body.phone,
            email: body.email,
            notes: body.notes
        }
    });

    return Response.json(client);
}