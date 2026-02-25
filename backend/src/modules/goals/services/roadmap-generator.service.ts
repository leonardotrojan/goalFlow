import { Injectable } from '@nestjs/common';

@Injectable()
export class RoadmapGeneratorService {
    async generate(input: {
        goalName: string
        description: string
        totalDays: number
    }) {
        await new Promise(resolve => setTimeout(resolve, 2000))

        const dailyPlans: { dayNumber: number; focusText: string }[] = []

        for (let i = 1; i <= input.totalDays; i++) {
            dailyPlans.push({
                dayNumber: i,
                focusText: `Day ${i}: Work on ${input.goalName}`
            })
        }

        return {
            minutesPerDay: 45,
            dailyPlans
        }
    }
}
