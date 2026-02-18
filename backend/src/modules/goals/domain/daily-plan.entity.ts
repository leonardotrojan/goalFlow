export interface DailyPlanProps {
    id: string
    goalId: string
    dayNumber: number
    focusText: string
}

export class DailyPlan {
    private props: DailyPlanProps

    constructor(props: DailyPlanProps) {
        this.props = props
    }

    getId() {
        return this.props.id
    }

    getGoalId() {
        return this.props.goalId
    }

    getDayNumber() {
        return this.props.dayNumber
    }

    getFocusText() {
        return this.props.focusText
    }
}