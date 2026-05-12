import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    const services = await prisma.service.findMany({
        orderBy: { name: "asc" }
    });

    return Response.json(services);
}
