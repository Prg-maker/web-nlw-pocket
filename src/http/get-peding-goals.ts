type PedingGoalsResponse = {
  id: string
  title: string
  desiredWeekFrequency: number
  completionCount: number
}[]
export async function getPedingGoals(): Promise<PedingGoalsResponse> {
  const response = await fetch('http://localhost:3333/peding-goals')
  const data = await response.json()

  return data.pedingGoals
}
