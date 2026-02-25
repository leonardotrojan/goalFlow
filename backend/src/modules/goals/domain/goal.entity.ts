import { DailyPlan } from "./daily-plan.entity";

export enum GoalStatus {
    GENERATING = 'GENERATING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export class Goal {
    private id: string;
    private userId: string
    private name: string
    private description: string
    private startDate: Date
    private totalDays: number
    private completedDays: number
    private minutesPerDay: number
    private status: GoalStatus
    private dailyPlans: DailyPlan[]
    private createdAt: Date
    private updatedAt?: Date

    constructor(props: {
        id: string
        userId: string
        name: string
        description: string
        totalDays: number
        minutesPerDay: number
        startDate?: Date
        completedDays?: number
        status?: GoalStatus
        dailyPlans: DailyPlan[]
        createdAt?: Date
        updatedAt?: Date
    }) {
        this.id = props.id;
        this.userId = props.userId;
        this.name = props.name;
        this.description = props.description;
        this.totalDays = props.totalDays;
        this.minutesPerDay = props.minutesPerDay;

        this.startDate = props.startDate ?? new Date();
        this.completedDays = props.completedDays ?? 0;
        this.status = props.status ?? GoalStatus.GENERATING;
        this.dailyPlans = props.dailyPlans ?? []
        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt;

        this.validate();
    }

    private validate() {
        if (this.totalDays <= 0) {
            throw new Error("TotalDays must be greater than 0")
        }

        if (this.minutesPerDay <= 0) {
            throw new Error("MinutesPerDay must be greater than 0")
        }

        if (!this.name || this.name.length < 3) {
            throw new Error("Goal name must have at least 3 characters")
        }
    }

    incrementCompletedDay() {
        if (this.completedDays >= this.totalDays) {
            throw new Error("Goal already completed")
        }

        this.completedDays++

        if (this.completedDays === this.totalDays) {
            this.status = GoalStatus.COMPLETED
        }
    }

    active() {
        if (this.status !== GoalStatus.GENERATING) {
            throw new Error("Goal cannot be activated")
        }

        this.status = GoalStatus.IN_PROGRESS
    }

    updateDetails(name: string, description: string) {
        if (!name || name.length < 3) {
            throw new Error("Goal name must have at least 3 characters")
        }

        this.name = name
        this.description = description
    }

    applyRoadmap(minutesPerDay: number, dailyPlans: DailyPlan[]) {
        if (this.status !== GoalStatus.GENERATING) {
            throw new Error("Roadmap can only be applied to generating goals")
        }

        if (dailyPlans.length !== this.totalDays) {
            throw new Error("DailyPlans count must match totalDays")
        }

        this.minutesPerDay = minutesPerDay

        this.dailyPlans = dailyPlans

        this.status = GoalStatus.IN_PROGRESS
    }

    markAsFailed() {
        this.status = GoalStatus.FAILED
    }

    getId() { return this.id; }
    getUserId() { return this.userId; }
    getName() { return this.name; }
    getDescription() { return this.description; }
    getTotalDays() { return this.totalDays; }
    getCompletedDays() { return this.completedDays; }
    getMinutesPerDay() { return this.minutesPerDay; }
    getStatus() { return this.status; }
    getDailyPlans() { return this.dailyPlans }
    getStartDate() { return this.startDate; }
    getCreatedAt() { return this.createdAt; }
}
