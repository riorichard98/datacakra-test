export interface LoginResponseData {
    token: string
}

export interface UpsertTouristResponseData {
    userId: string
    fullName: string
    email: string
}

export interface DeleteTouristResponseData {
    deletedUserId: string
}

export type ListTouristResponseData = {
    userId: string
    fullName: string
    email: string
}[]

export interface UpdateTripResponseData {
    updatedTripId: string
}

export interface InsertTripResponseData {
    destination: string
    endDate: Date
    startDate: Date
    tripId: string
}

export interface DeleteTripResponseData {
    deletedTripId: string
}

export type ListTripResponseData = {
    destination: string
    endDate: Date
    startDate: Date
    tripId: string
}[]

export interface UserTripTime {
    endDate: Date | string
    startDate: Date | string
    userId: string
    tripId?: string
}