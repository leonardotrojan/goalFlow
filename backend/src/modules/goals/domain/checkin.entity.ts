export interface CheckInProps {
    id: string
    goalId: string
    dayNumber: number
    completedAt: Date
}

export class CheckIn {
    private props: CheckInProps

    constructor(props: CheckInProps) {
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

    getCompletedAt() {
        return this.props.completedAt
    }
}