export class DailyPlan {
    private id: string
    private goalId: string
    private dayNumber: number
    private focusText: string

    constructor(props: {
        id: string
        goalId: string
        dayNumber: number
        focusText: string
    }) {
        this.id = props.id
        this.goalId = props.goalId
        this.dayNumber = props.dayNumber
        this.focusText = props.focusText

        this.validate()
    }

    private validate() {
        if (this.dayNumber <= 0) {
            throw new Error('Day number must be greater than 0')
        }

        if (!this.focusText || this.focusText.length < 3) {
            throw new Error('FocusText must have at least 3 characters')
        }
    }

    getId() { return this.id }
    getGoalId() { return this.goalId }
    getDayNumber() { return this.dayNumber }
    getFocusText() { return this.focusText }
}