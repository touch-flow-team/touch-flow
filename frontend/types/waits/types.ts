export interface WaitingListCardProps {
    id: string
    user_phone_number: string
    adult_persons: number
    child_persons: number
    created: Date
    admission_status: boolean
}

export type UseFetchWaitListResult = [
    string,  // manageId
    string,  // companyId
    string,  // companyName
    number,  // waitTime
    number,  // userWaitsNumber
    boolean, // rulesEnabled
    string,  // rulesContent
    number,  // limitPerson
    UserWaitParams[],  // waitUserList
    string,  // phoneNumber
    React.Dispatch<React.SetStateAction<string>>,  // setPhoneNumber
    React.Dispatch<React.SetStateAction<boolean>>  // setIsFetching
];

export type UseFetchWaitDashboardList = [
    string,
    string,
    Array<WaitingListCardProps>,
    Array<WaitingListCardProps>
]

export type UseFetchWaitSettings = [
    boolean,
    number,
    number,
    boolean,
    string,
    string,
    Array<string>,
    string,
    React.Dispatch<React.SetStateAction<boolean>>,  
    React.Dispatch<React.SetStateAction<boolean>>,
    React.Dispatch<React.SetStateAction<string>>
]

export interface UserWaitParams {
    id: string
    user_phone_number: string
    admission_status: boolean
    adult_persons: number
    child_persons: number
    collectionId: string
    collectionName: string
    created: Date
    updated: Date
}

export interface UserWaitCreateParams {
    user_phone_number: string
    admission_status: boolean
    adult_persons: number
    child_persons: number
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

export interface WaitingCardProps {
    companyName: string
    waitingNumber: number
    waitingTime: number
}

export interface WaitConfirmModalProps {
    phoneNumber: string
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
    manageData: ManagementWaitConfirmParams
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
}

export interface WaitingSettingsModalProps {
    label: string
    manageId: string
    manageData: ManagementWaitCreateParams
    name: string
}