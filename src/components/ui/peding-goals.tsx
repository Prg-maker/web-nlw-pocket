import { Plus } from 'lucide-react'
import { OutlineButton } from './outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPedingGoals } from '../../http/get-peding-goals'
import { craeteGoalCompletion } from '../../http/create-goal-completion'

export function PedingGoals() {
  const queryClintt = useQueryClient()

  const { data } = useQuery({
    queryKey: ['peding-goals'],
    queryFn: getPedingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await craeteGoalCompletion(goalId)

    queryClintt.invalidateQueries({ queryKey: ['summary'] })
    queryClintt.invalidateQueries({ queryKey: ['peding-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton
            onClick={event => handleCompleteGoal(goal.id)}
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeekFrequency}
          >
            <Plus className="size-4 text-zinc-600" /> {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
