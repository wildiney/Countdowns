export type Events = {
  id: string,
  user: string,
  event: string,
  bgImage?: string,
  date: string
}
const events: Events[] = [
  {
    id: "1",
    user: "Fernando",
    event: "ferias",
    bgImage: 'https://images.unsplash.com/photo-1507295386538-ddd5e86cd597?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: 'mar 02, 2024 18:00:00'
  },
  {
    id: "2",
    user: "Fernando",
    event: "02",
    date: 'mar 02, 2025 18:00:00'
  },
  {
    id: "3",
    user: "Teste",
    event: "02",
    date: 'mar 02, 2024 18:00:00'
  }
]

export async function GET (request: Request, context: { params: { user: string, eventId: string } }) {
  const user = context.params.user

  const filtered = events.filter((event) => {
    return event.user.toLowerCase() == user.toLowerCase()
  })
  return Response.json(filtered)
}