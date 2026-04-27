export function mapAppointmentToFrontend(a: any) {
    return {
        id: a.id,
        clientId: a.clientId,
        clientName: a.client.name,

        date: a.date.toISOString().split('T')[0],
        time: a.startTime,
        endTime: a.endTime,

        service: a.service.name,

        status: a.status,
        notes: a.notes
    }
}