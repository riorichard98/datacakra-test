import dayjs from 'dayjs'

import prisma from '../models/primsa-client'
import { TripAnalytics } from './interface'
import { TripAnalytic } from '@prisma/client'

const summarizeTripAnalytics = async (): Promise<TripAnalytics> => {
    // Total trip
    const totalTrips = await prisma.trip.count()

    // Total users that has done trip
    const totalTourists = await prisma.user.count({
        where: {
            trips: {
                some: {}, // users has at least 1 trip
            },
        },
    })

    // Average trip duration for all users (in days)
    const tripDurations = await prisma.trip.findMany({
        select: {
            startDate: true,
            endDate: true
        }
    })

    const avgTripDurationInDays = tripDurations.reduce((total, trip) => {
        const duration = dayjs(trip.endDate).diff(dayjs(trip.startDate), 'day')
        return total + duration
    }, 0) / (tripDurations.length || 1)


    // top 5 destinations
    const topDestinationsRaw = await prisma.trip.groupBy({
        by: ['destination'],
        _count: {
            destination: true
        },
        orderBy: {
            _count: {
                destination: 'desc'
            }
        },
        take: 5 // Top 5
    })

    const topDestinations = topDestinationsRaw.map((item) => ({
        destination: item.destination,
        count: item._count.destination
    }))

    return {
        avgTripDurationInDays,
        topDestinations,
        totalTrips,
        totalTourists
    }
}

const UpdateTripAnalytics = async (): Promise<void> => {
    const tripAnalytics = await summarizeTripAnalytics()
    await prisma.tripAnalytic.create({
        data: tripAnalytics
    })
}

const getLatestTripAnalytics = async (): Promise<TripAnalytic | null> => {
    return prisma.tripAnalytic.findFirst({
        orderBy: {
            generatedAt: 'desc'
        }
    })
}

export const tripAnalyticsUsecase = {
    summarizeTripAnalytics,
    getLatestTripAnalytics,
    UpdateTripAnalytics
}