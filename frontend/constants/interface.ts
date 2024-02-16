export interface UserWaitParams {
    id: string
    user_phone_number: string
    admission_status: boolean
    user_selected_persons: number
    collectionId: string
    collectionName: string
    created: Date
    updated: Date
}

export interface UserWaitCreateParams {
    user_phone_number: string
    admission_status: boolean
    user_selected_persons: number
}

export interface ManagementWaitParams {
    company: string
    waiting_enabled: boolean
    estimated_waiting_time: number
    limit_persons: number
    rules_enabled: boolean
    rules_content: string
}

export interface ManagementWaitCreateParams extends ManagementWaitParams {
    user_waits: string[]
}

export interface ManagementWaitConfirmParams extends ManagementWaitParams {
    id: string
    expand: {
        user_waits: Array<UserWaitParams>
    }
}
